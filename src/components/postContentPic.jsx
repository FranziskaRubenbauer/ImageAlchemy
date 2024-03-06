import React, { useEffect } from "react";

function ContentImageSenderComponent({ photo, setBool }) {
  const imagePath = photo;
  const token = "cbf883cb302e4b5c83c97dcd203b402e";
  const serverUri = `wss://ki-server.oth-aw.de/user/5f1a/proxy/8810/ws/send-content-image?token=${token}`;

  function hanleClick() {
    sendImageToServer(imagePath, serverUri);
  }

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
        // Hier können Sie die Logik für die Bestätigungsnachricht implementieren
      };

      websocket.onerror = (error) => {
        console.error("WebSocket Fehler aufgetreten:", error);
      };

      websocket.onclose = () => {
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
      setBool(true);
      websocket.close();
    } catch (error) {
      console.error("Fehler beim Lesen und Senden des Bildes:", error);
      websocket.close();
    }
  }

  return (
    <div>
      <button onClick={hanleClick}>Send Content</button>
    </div>
  );
}

export default ContentImageSenderComponent;
