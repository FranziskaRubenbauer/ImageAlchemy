import torch
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import json
import os
from PIL import Image
from torchvision import transforms
import re
import asyncio

# Importiere die Modellklasse aus transformer_net.py
from transformer_net import TransformerNet

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Verwendetes Gerät: {device}")

# Initialisiere die Modelle
starry_night = TransformerNet()
big_wave = TransformerNet()
monet_japanese = TransformerNet()
mack_formen = TransformerNet()
braque_violin = TransformerNet()
braque_woman = TransformerNet()
picasso_weeping = TransformerNet()
picasso_guitarist = TransformerNet()
klimt_watersnakes = TransformerNet()
kandinsky_composition = TransformerNet()
pollock_mural = TransformerNet()
munch_schrei = TransformerNet()

models = {
    "Gogh-Starry": starry_night,
    "Big-Wave": big_wave,
    "Monet-Japanese": monet_japanese,
    "Mack-Formen": mack_formen,
    "Braque-Violin": braque_violin,
    "Braque-Woman": braque_woman,
    "Picasso-Weeping": picasso_weeping,
    "Picasso-Guitarist": picasso_guitarist,
    "Klimt-Watersnakes": klimt_watersnakes,
    "Kandinsky-Composition": kandinsky_composition,
    "Pollock-Mural": pollock_mural,
    "Munch-Schrei": munch_schrei,
}

for model_name, model in models.items():
    model_path = f"Modelle/{model_name}.model"
    if os.path.exists(model_path):
        state_dict = torch.load(model_path)
        # remove saved deprecated running_* keys in InstanceNorm from the checkpoint
        for k in list(state_dict.keys()):
            if re.search(r'in\d+\.running_(mean|var)$', k):
                del state_dict[k]
        model.load_state_dict(state_dict)
        model.to(device)
        model.eval()
    else:
        print(f"Model file {model_path} not found. Skipping loading for {model_name}.")

app = FastAPI()

UPLOAD_DIR = "uploads"
ausgabebild_filepath = "./Ausgabebild.png"

def load_image(filename, size=None, scale=None):
    img = Image.open(filename).convert('RGB')
    if size is not None:
        img = img.resize((size, size), Image.Resampling.LANCZOS)
    elif scale is not None:
        img = img.resize((int(img.size[0] / scale), int(img.size[1] / scale)), Image.Resampling.LANCZOS)
    return img

def save_image(filename, data):
    img = data.clone().clamp(0, 255).numpy()
    img = img.transpose(1, 2, 0).astype("uint8")
    img = Image.fromarray(img)
    img.save(filename)

# Erlaube Cross-Origin-Zugriff von deinem Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Für Entwicklung; ändere auf deine Domain für Prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def send_output_image(output_image_path, websocket):
    try:
        with open(output_image_path, 'rb') as f:
            image_bytes = f.read()
        await websocket.send_bytes(image_bytes)
        print("Ausgabebild erfolgreich gesendet.")
    except FileNotFoundError:
        print(f"Das Ausgabebild unter {output_image_path} wurde nicht gefunden.")
    except Exception as e:
        print(f"Ein Fehler ist aufgetreten beim Senden des Ausgabebilds: {str(e)}")

@app.websocket("/ws/connection-test")
async def websocket_conncetion_test(websocket: WebSocket):
    await websocket.accept()
    message = await websocket.receive_text() 
    try:
        if message == "connection test":
            await websocket.send_text("Verbindung erfolgreich.")
        else:
            await websocket.close()
    except Exception as e:
        print(f"Ein Fehler ist beim Verbindungsversuch aufgetreten: {str(e)}")

@app.websocket("/ws/endpoint")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    model_to_use = None
    is_connected = True

    try:
        while is_connected:
            try:
                # Nachrichten empfangen
                message = await websocket.receive_text()
                message_data = message.split(':')

                model_to_use = models[message_data[0]]

                # Überprüfen, ob das Modell gesetzt wurde
                if model_to_use is None:
                    await websocket.send_text("Fehler: Kein Modell ausgewählt.")
                    continue

                # Der Rest der Nachricht wird als Binärdaten für das Bild behandelt
                image_data = await websocket.receive_bytes()
                image_filename = "content_image.jpg"
                image_path = os.path.join(UPLOAD_DIR, image_filename)

                # Speichern des empfangenen Bildes
                os.makedirs(UPLOAD_DIR, exist_ok=True)
                with open(image_path, 'wb') as f:
                    f.write(image_data)

                # Bild laden und vorbereiten
                img = load_image(image_path, size=512)

                content_transform = transforms.Compose([
                    transforms.ToTensor(),
                    transforms.Lambda(lambda x: x.mul(255))
                ])
                content_image = content_transform(img)
                content_image = content_image.unsqueeze(0).to(device)

                # Modell aufrufen und Ausgabe generieren
                with torch.no_grad():
                    output = model_to_use(content_image).cpu()

                # Ausgabe speichern
                print("Shape of the tensor:", output.shape)
                save_image(ausgabebild_filepath, output[0])

                # Sende das Ergebnis zurück an den Client
                await send_output_image(ausgabebild_filepath, websocket)

            except WebSocketDisconnect:
                print("Client disconnected")
                is_connected = False  # Verbindung als geschlossen markieren
                break  # Schleife beenden, wenn der Client die Verbindung trennt

    except Exception as e:
        print(f"Unexpected error: {e}")

    finally:
        if is_connected:
            await websocket.close()


if __name__ == "__main__":
    import asyncio
    asyncio.run(uvicorn.run(app, host="0.0.0.0", port=8810, log_level="info"))