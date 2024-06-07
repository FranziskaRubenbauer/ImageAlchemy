import React, { useState, useEffect, useRef } from "react";
import LinearDeterminate from "./linearDeterminate.jsx";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import ScheduleSendIcon from "@mui/icons-material/ScheduleSend";
import { Container } from "@mui/material";
import EpochImageReceiver from "./epochImageReciever.jsx";

/**
 * ServerCom ist eine Komponente, die für die Kommunikation mit einem WebSocket-Server zuständig ist.
 * Sie sendet Bilder (Inhalts- und Stilbild) an den Server und empfängt das bearbeitete Bild zurück.
 * Während des Prozesses werden Statusmeldungen und ein Fortschrittsbalken angezeigt.
 *
 * @param {Object} props - Die Props für die ServerCom-Komponente.
 * @param {string} props.contentImage - Der Pfad des Inhaltsbildes.
 * @param {string} props.styleImage - Der Pfad des Stilbildes.
 * @param {Function} props.setOutputImage - Eine Funktion, um das vom Server bearbeitete Bild zu setzen.
 * @param {Function} props.setActiveStep - Eine Funktion, um den aktuellen Schritt im Prozess zu steuern.
 * @param {Function} props.setOutputImageURL - Eine Funktion, um die URL des bearbeiteten Bildes zu setzen.
 */
export default function ServerCom({
  contentImage,
  styleImage,
  setOutputImage,
  setActiveStep,
  setOutputImageURL,
}) {
  const [styleUploadSuccess, setStyleUploadSuccess] = useState(null);
  const [contentUploadSuccess, setContentUploadSuccess] = useState(null);
  const [notebookFinished, setnotebookFinished] = useState(false);
  const websocket = useRef(null);

  //Umgeht, dass beim Mount die Websocket-Verbindung zweimal hergestellt wird
  var count = 0;
  useEffect(() => {
    if (count === 0) connect();
    count++;
  }, []);

  //Wenn Notebook fertig, soll auf den nächsten Schritt weitergeleitet werden
  useEffect(() => {
    if (notebookFinished) {
      setActiveStep(4);
    }
  }, [notebookFinished]);

  /**
   * Sendet ein Bild an den WebSocket-Server.
   * @param {string} imageFilePath - Der Pfad des Bildes.
   * @param {WebSocket} websocket - Die WebSocket-Verbindung.
   * @param {string} imageType - Der Typ des Bildes ('send style image' oder 'send content image').
   */
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

  /**
   * Stellt die Verbindung zum WebSocket-Server her und definiert Event-Handler.
   */
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
            sendImageToServer(
              contentImage,
              websocket.current,
              "send content image"
            );
          } else if (message === "Contentbild erfolgreich hochgeladen") {
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
          //console.log(imageUrl);

          setnotebookFinished(true);
          websocket.current.close();
        }
      };

      websocket.current.onerror = (error) => {
        console.error("WebSocket Fehler aufgetreten:", error);
      };

      websocket.current.onclose = () => {
        console.log("WebSocket Verbindung geschlossen.");
      };
    } catch (error) {
      console.error("Fehler beim Verbinden:", error);
    }
  }

  /**
   * Konvertiert ein Blob-Objekt in eine Data URL.
   * @param {Blob} blob - Das Blob-Objekt, das konvertiert werden soll.
   * @returns {Promise<string>} Eine Promise, die eine Data URL zurückgibt.
   */
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
        ) : styleUploadSuccess ? null : (
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
        ) : contentUploadSuccess ? null : (
          <Alert
            icon={<ErrorIcon fontSize="inherit" />}
            severity="error"
            sx={{ width: "80vw", margin: 2 }}
          >
            Fehler beim Senden des Inhaltsbildes.
          </Alert>
        )}
      </div>
      {contentUploadSuccess & styleUploadSuccess ? (
        <>
          <EpochImageReceiver></EpochImageReceiver>
          <LinearDeterminate></LinearDeterminate>
        </>
      ) : null}
    </>
  );
}
