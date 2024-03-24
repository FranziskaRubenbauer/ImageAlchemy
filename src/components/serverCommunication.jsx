import { useState, useEffect, useRef } from "react";
import LinearDeterminate from "./linearDeterminate.jsx";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";

export default function ServerCom({
  contentImage,
  styleImage,
  setOutputImage,
  setActiveStep,
  setOutputImageURL,
}) {
  const [isStyleUploadFinished, setStyleUploadFinished] = useState(false);
  const [isContentUploadFinished, setContentUploadFinished] = useState(false);
  const [styleUploadSuccess, setStyleUploadSuccess] = useState(null);
  const [contentUploadSuccess, setContentUploadSuccess] = useState(null);
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

      if (imageType == "send style image") setStyleUploadSuccess(true);
      if (imageType == "send content image") setContentUploadSuccess(true);

      // Lese den Blob als ArrayBuffer
      reader.readAsArrayBuffer(imageBlob);
    } catch (error) {
      console.error("Error sending the image to the server:", error);
      if (imageType == "send style image") setStyleUploadSuccess(false);
      if (imageType == "send content image") setContentUploadSuccess(false);
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

          // Direktes Übergeben des Blob-Objekts an die Funktion
          blobToDataURL(imageBlob)
            .then((dataUrl) => {
              setOutputImageURL(dataUrl); // Verwendung der Data URL
            })
            .catch((error) => console.log(error));

          const imageUrl = URL.createObjectURL(imageBlob); // Nur für Anzeigezwecke
          setOutputImage(imageUrl);
          console.log(imageUrl);

          setnotebookFinished(true);
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

  function blobToDataURL(blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function () {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  return (
    <>
      <div>
        {styleUploadSuccess === null ? (
          <Alert
            icon={<ScheduleSendIcon fontSize="inherit" />}
            severity="info"
            sx={{ width: "80vw", margin: 2 }}
          >
            Sendet Stilbild...
          </Alert>
        ) : styleUploadSuccess ? (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            sx={{ width: "80vw", margin: 2 }}
          >
            Stilbild wurde erfolgreich gesendet.
          </Alert>
        ) : (
          <Alert
            icon={<ErrorIcon fontSize="inherit" />}
            severity="error"
            sx={{ width: "80vw", margin: 2 }}
          >
            Fehler beim Senden des Stilbildes.
          </Alert>
        )}
      </div>
      <div sx={{ margin: 2 }}>
        {contentUploadSuccess === null ? (
          <Alert
            icon={<ScheduleSendIcon fontSize="inherit" />}
            severity="info"
            sx={{ width: "80vw", margin: 2 }}
          >
            Sendet Inhaltsbild...
          </Alert>
        ) : contentUploadSuccess ? (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            sx={{ width: "80vw", margin: 2 }}
          >
            Inhaltsbild wurde erfolgreich gesendet.
          </Alert>
        ) : (
          <Alert
            icon={<ErrorIcon fontSize="inherit" />}
            severity="error"
            sx={{ width: "80vw", margin: 2 }}
          >
            Fehler beim Senden des Inhaltsbildes.
          </Alert>
        )}
      </div>
      <LinearDeterminate></LinearDeterminate>
    </>
  );
}
