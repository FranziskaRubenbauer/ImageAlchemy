import React, { useEffect } from "react";
import LinearDeterminate from "./linearDeterminate.jsx";

function NotebookRunner({ setStyleTransferFinished, setOutputImage }) {
  const [notebookFinished, setnotebookFinished] = React.useState(false);
  const [outputImageTemp, setOutputImageTemp] = React.useState(null);

  var count = 0;
  useEffect(() => {
    if (count === 0) connect();
    count++;
  }, []);

  useEffect(() => {
    if (notebookFinished) {
      async function getImage() {
        var pic = await getImageFromServer();
        setOutputImage(pic);
        setStyleTransferFinished(true);
      }
      getImage();
    }
  }, [notebookFinished]);

  async function connect() {
    const token = "cbf883cb302e4b5c83c97dcd203b402e";
    const uri = `wss://ki-server.oth-aw.de/user/5f1a/proxy/8810/ws/endpoint?token=${token}`;

    try {
      const websocket = new WebSocket(uri);

      websocket.onopen = () => {
        console.log("WebSocket Verbindung fürs Notebook geöffnet.");
        websocket.send("run notebook");
      };

      websocket.onmessage = async (event) => {
        const image_data = event.data;
        console.log("ON Message");
        console.log(image_data);
        if (image_data === "Notebook erfolgreich ausgeführt.") {
          console.log("ON Erfolgreich");
          console.log(image_data);
          console.log("Schließe die WebSocket-Verbindung fürs Notebook.!!!!");
          websocket.close();
          setnotebookFinished(true);
        }
      };

      websocket.onerror = (error) => {
        console.error("WebSocket Fehler aufgetreten:", error);
      };

      websocket.onclose = () => {
        console.log("WebSocket Verbindung DES NOTEBOOKS geschlossen.");
      };
    } catch (error) {
      console.error("Fehler beim Verbinden:", error);
    }
  }

  return <LinearDeterminate></LinearDeterminate>;
}

export default NotebookRunner;

async function getImageFromServer() {
  return new Promise((resolve, reject) => {
    const token = "cbf883cb302e4b5c83c97dcd203b402e";
    const uri = `wss://ki-server.oth-aw.de/user/5f1a/proxy/8810/ws/get_finished_pic?token=${token}`;
    try {
      const websocket = new WebSocket(uri);

      websocket.onopen = () => {
        console.log("WebSocket Verbindung für Ausgabebild geöffnet.");
      };

      websocket.onmessage = (event) => {
        const image_data = event.data;
        console.log(image_data);
        const blob = new Blob([image_data], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);

        console.log("IMG URL:", imageUrl);

        // Bilddaten erfolgreich empfangen, löse das Promise mit der Bild-URL aus
        resolve(imageUrl);
      };

      websocket.onerror = (error) => {
        console.error("WebSocket für Ausgabebild Fehler aufgetreten:", error);
        // Bei einem Fehler, reject das Promise mit dem Fehler
        reject(error);
      };

      websocket.onclose = () => {
        console.log("WebSocket Verbindung für Ausgabebild geschlossen.");
      };
    } catch (error) {
      console.error("Fehler beim Verbinden:", error);
      // Bei einem Fehler, reject das Promise mit dem Fehler
      reject(error);
    }
  });
}
