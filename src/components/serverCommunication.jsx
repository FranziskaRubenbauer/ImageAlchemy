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
    return () => {
      if (websocket.current) {
        websocket.current.close();
      }
    };
  }, []);

  //Wenn Contentbild hochgeladen wurde, Notebook starten
  useEffect(() => {
    if (isStyleUploadFinished && isContentUploadFinished) {
      websocket.current.send("run notebook");
    }
  }, [isContentUploadFinished]);

  //Wenn Notebook fertig
  useEffect(() => {
    if (notebookFinished) {
      setActiveStep(4);
    }
  }, [notebookFinished]);

  async function connect() {
    const token = "cbf883cb302e4b5c83c97dcd203b402e";
    const uri = `wss://ki-server.oth-aw.de/user/5f1a/proxy/8810/ws/endpoint?token=${token}`;

    try {
      websocket.current = new WebSocket(uri);

      websocket.current.onopen = () => {
        console.log("WebSocket Verbindung fürs Notebook geöffnet.");
        sendImageToServer(styleImage, "style");
      };

      async function sendImageToServer(imagePath, imageType) {
        const response = await fetch(imagePath);
        const blob = await response.blob();
        const imageArrayBuffer = await blob.arrayBuffer();
        const command =
          imageType === "style" ? "send style image" : "send content image";
        websocket.current.send(
          `${command}:${new Uint8Array(imageArrayBuffer).toString()}`
        );
      }

      websocket.current.onmessage = async (event) => {
        const message = event.data;
        console.log(message);

        if (message === "Stylebild erfolgreich hochgeladen") {
          setStyleUploadFinished(true); // Setzt den Zustand, dass das Stylebild hochgeladen wurde
          // Nachdem das Stylebild erfolgreich hochgeladen wurde, sende das Contentbild
          sendImageToServer(contentImage, "content");
        } else if (message === "Contentbild erfolgreich hochgeladen") {
          setContentUploadFinished(true); // Setzt den Zustand, dass das Contentbild hochgeladen wurde
          // Contentbild wurde hochgeladen, jetzt das Notebook ausführen
          websocket.current.send("run notebook");
        } else if (message === "Notebook erfolgreich ausgeführt.") {
          console.log(
            "Schließe die WebSocket-Verbindung, da alle Prozesse abgeschlossen sind."
          );
          websocket.current.close(); // Verbindung schließen, nachdem alle Aktionen abgeschlossen sind
        } else {
          // Verarbeitung des empfangenen Bildes
          const blob = new Blob([message], { type: "image/png" });
          const imageUrl = URL.createObjectURL(blob);
          setOutputImage(imageUrl);
          setnotebookFinished(true);
          console.log("IMG URL:", imageUrl);
          // Hier nicht schließen, da wir warten, bis "Notebook erfolgreich ausgeführt" empfangen wird
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
