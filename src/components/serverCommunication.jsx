import { useState, useEffect, useRef } from "react";
import ContentImageSenderComponent from "./postContentPic";
import StyleImageSenderComponent from "./postStylePic";
import NotebookRunner from "./notebookRunner";
import LinearDeterminate from "./linearDeterminate.jsx";

export default function ServerCom({
  contentImage,
  styleImage,
  setOutputImage,
  setActiveStep,
}) {
  const [isStyleUploadFinished, setStyleUploadFinished] = useState(false);
  const [isContentUploadFinished, setContentUploadFinished] = useState(false);
  const [notebookFinished, setnotebookFinished] = useState(false);
  const websocket = useRef(null);

  var count = 0;
  useEffect(() => {
    if (count === 0) connect();
    count++;
  }, []);

  //Wenn Contentbild hochgeladen wurde, Notebook starten
  useEffect(() => {
    if (isStyleUploadFinished && isContentUploadFinished) {
      //websocket.current.send("run notebook");
    }
  }, [isContentUploadFinished]);

  //Wenn Notebook fertig
  useEffect(() => {
    if (notebookFinished) {
      setActiveStep(4);
    }
  }, [notebookFinished]);

  async function sendImageToServer(imageFilePath, websocket, imageType) {
    try {
      // Abrufen der Bilddatei über den Pfad
      const response = await fetch(imageFilePath);
      if (!response.ok) {
        throw new Error(
          `Failed to fetch ${imageFilePath}: ${response.statusText}`
        );
      }

      // Umwandeln der Antwort in einen Blob
      const imageBlob = await response.blob();

      // Lesen des Blobs als ArrayBuffer
      const reader = new FileReader();
      reader.onload = function (event) {
        const arrayBuffer = event.target.result;

        // Zuerst sende einen Text mit dem Befehl, damit der Server weiß, was als nächstes kommt
        websocket.send(`${imageType}:`); // imageType könnte 'send style image' oder 'send content image' sein

        // Dann sende die Bilddaten als Binärdaten
        websocket.send(arrayBuffer);
      };

      // Lese den Blob als ArrayBuffer
      reader.readAsArrayBuffer(imageBlob);
    } catch (error) {
      console.error("Error sending the image to the server:", error);
    }
  }

  async function connect() {
    const token = "cbf883cb302e4b5c83c97dcd203b402e";
    const uri = `wss://ki-server.oth-aw.de/user/5f1a/proxy/8810/ws/endpoint?token=${token}`;

    try {
      websocket.current = new WebSocket(uri);

      websocket.current.onopen = () => {
        console.log("WebSocket Verbindung fürs Notebook geöffnet.");
        sendImageToServer(styleImage, websocket.current, "send style image");
      };

      websocket.current.onmessage = async (event) => {
        if (typeof event.data === "string") {
          const message = event.data;
          console.log(message);

          if (message === "Stylebild erfolgreich hochgeladen") {
            setStyleUploadFinished(true);
            sendImageToServer(
              contentImage,
              websocket.current,
              "send content image"
            );
          } else if (message === "Contentbild erfolgreich hochgeladen") {
            setContentUploadFinished(true);
            websocket.current.send("run notebook");
          } else if (message === "Notebook erfolgreich ausgeführt.") {
            console.log("Warte auf das fertige Bild...");
            // Nicht schließen, erwarte das Bild
          }
        } else if (event.data instanceof Blob) {
          // Verarbeiten der Binärdaten (Bild)
          const imageBlob = event.data;
          const imageUrl = URL.createObjectURL(imageBlob);
          setOutputImage(imageUrl);
          setnotebookFinished(true);
          console.log("IMG URL:", imageUrl);

          // Du könntest hier die Verbindung schließen, wenn das Bild das letzte erwartete Element der Kommunikation ist
          websocket.current.close();
        }
      };

      websocket.current.onerror = (error) => {
        console.error("WebSocket Fehler aufgetreten:", error);
      };

      websocket.current.onclose = () => {
        console.log("WebSocket Verbindung DES NOTEBOOKS geschlossen.");
      };
    } catch (error) {
      console.error("Fehler beim Verbinden:", error);
    }
  }

  return (
    <>
      <LinearDeterminate></LinearDeterminate>
    </>
  );
}
