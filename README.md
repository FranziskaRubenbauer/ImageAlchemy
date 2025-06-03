# ImageAlchemy – Neural Style Transfer Demonstrator App  
**© CC BY-NC-ND 4.0**  


## 📖 Über das Projekt  
Diese App ist der praktische Teil meiner Bachelorarbeit mit dem Titel:  
**"Entwicklung einer Demonstrator-App für KI-basierte Bildmanipulation am Beispiel des Neural Style Transfer"**  
*(engl.: "Development of a demonstrator app for AI-based image manipulation using the example of Neural Style Transfer")*  

![grafik](https://github.com/user-attachments/assets/772575ba-bd67-416a-95a5-d4212b48b8ae)

Die mobile Anwendung ermöglicht Nutzern:  
- Aufnahme oder Upload von Fotos  
- Auswahl künstlerischer Stile (z.B. Monet, Picasso)  
- KI-gestützten Style-Transfer in Echtzeit  

## 🛠 Technologien  
- **Frontend**: React.js (Mobile-optimiert)  
- **Backend**: Python (Flask/PyTorch für NST-Modell)  
- **KI-Modell**: Pretrained Neural Style Transfer (z.B. VGG19)  

## 🚀 Lokale Installation  
### Voraussetzungen  
- Python 3.8+  
- Node.js 16+  
- npm/yarn  

### Schritt-für-Schritt  
1. **Backend starten** (Style-Transfer-Server):  
   ```bash
   cd ImageAlchemy/Servercode
   pip install -r requirements.txt  # Abhängigkeiten installieren
   python server.py                # Server starten (kann mehrere Minuten dauern)
   ```

2. **Frontend starten** (in separatem Terminal):  
   ```bash
   cd ImageAlchemy
   npm install   # Dependencies installieren
   npm run dev   # App unter http://localhost:3000 starten
   ```

3. **App nutzen**:  
   - Öffne `http://localhost:3000` im Browser
   - Foto hochladen → Stil wählen → KI-Verarbeitung abwarten   

## 📜 Bachelorarbeit  
*(Optional: PDF-Link oder Abstract einfügen)*  

---
