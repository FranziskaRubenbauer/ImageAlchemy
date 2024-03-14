import React, { useEffect } from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

function StyleImageSenderComponent({ image, setBool }) {
  const imagePath = image;
  const token = "cbf883cb302e4b5c83c97dcd203b402e";
  const serverUri = `wss://ki-server.oth-aw.de/user/5f1a/proxy/8810/ws/send-style-image?token=${token}`;
  const [connectionSuccessfull, setConnectionSuccessfull] =
    React.useState(null);

  React.useEffect(() => {
    sendImageToServer(imagePath, serverUri);
  }, []);

  async function sendImageToServer(imagePath, serverUri) {
    try {
      const websocket = new WebSocket(serverUri);

      websocket.onopen = () => {
        console.log("WebSocket Verbindung geöffnet.");
        readFileAndSendImage(websocket, imagePath);
      };

      websocket.onmessage = (event) => {
        const response = event.data;
        console.log(response);
        setConnectionSuccessfull(true);
      };

      websocket.onerror = (error) => {
        console.error("WebSocket Fehler aufgetreten:", error);
        setConnectionSuccessfull(false);
      };

      websocket.onclose = () => {
        setBool(true);
        console.log("WebSocket Verbindung geschlossen.");
      };
    } catch (error) {
      console.error("Fehler beim Verbinden:", error);
    }
  }

  async function readFileAndSendImage(websocket, imagePath) {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const imageArrayBuffer = await blob.arrayBuffer();
      websocket.send(imageArrayBuffer);
      websocket.close();
    } catch (error) {
      console.error("Fehler beim Lesen und Senden des Bildes:", error);
      websocket.close();
    }
  }

  return (
    <div>
      {connectionSuccessfull ? (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
          Inhaltsbild wurde übersendet.
        </Alert>
      ) : (
        <Alert icon={<CheckIcon fontSize="inherit" />} severity="error">
          Fehler beim Senden des Inhaltsbild.
        </Alert>
      )}
    </div>
  );
}

export default StyleImageSenderComponent;
