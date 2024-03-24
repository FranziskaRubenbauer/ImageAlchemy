import React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

function ImageSenderComponent({ image, setBool, imageType }) {
  const imagePath = image;
  const token = "cbf883cb302e4b5c83c97dcd203b402e";
  const serverUri = `wss://ki-server.oth-aw.de/user/5f1a/proxy/8810/ws/endpoint?token=${token}`;
  const [connectionSuccessful, setConnectionSuccessful] = React.useState(null);

  React.useEffect(() => {
    sendImageToServer(imagePath, serverUri);
  }, [imagePath, serverUri]);

  async function sendImageToServer(imagePath, serverUri) {
    try {
      const websocket = new WebSocket(serverUri);

      websocket.onopen = async () => {
        console.log("WebSocket Verbindung geöffnet.");
        const response = await fetch(imagePath);
        const blob = await response.blob();
        const imageArrayBuffer = await blob.arrayBuffer();
        const command =
          imageType === "style" ? "send style image" : "send content image";
        websocket.send(
          `${command}:${new Uint8Array(imageArrayBuffer).toString()}`
        );
        setBool(true);
      };

      websocket.onmessage = (event) => {
        const response = event.data;
        console.log(response);
        setConnectionSuccessful(true);
        websocket.close();
      };

      websocket.onerror = (error) => {
        console.error("WebSocket Fehler aufgetreten:", error);
        setConnectionSuccessful(false);
      };

      websocket.onclose = () => {
        console.log("WebSocket Verbindung geschlossen.");
      };
    } catch (error) {
      console.error("Fehler beim Verbinden:", error);
      setConnectionSuccessful(false);
    }
  }

  return (
    <div>
      {connectionSuccessful === null ? (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="info">
          Sendet Bild...
        </Alert>
      ) : connectionSuccessful ? (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Bild wurde erfolgreich gesendet.
        </Alert>
      ) : (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          Fehler beim Senden des Bildes.
        </Alert>
      )}
    </div>
  );
}

export default ImageSenderComponent;
