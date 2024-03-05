import React, { useState, useEffect } from "react";
import axios from "axios";

const ImageFetcher = () => {
  const [imageSrc, setImageSrc] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const url = "https://ki-server.oth-aw.de/user/5f1a/proxy/8810/ausgabebild/";
    const token = "cbf883cb302e4b5c83c97dcd203b402e";
    const headers = { Authorization: `token ${token}` };

    axios
      .get(url, { headers, responseType: "blob" })
      .then((response) => {
        // Erstellen Sie eine URL für das Blob-Objekt und setzen Sie es als Bildquelle
        setImageSrc(URL.createObjectURL(response.data));
        setOutputImage(URL.createObjectURL(response.data));
      })
      .catch((error) => {
        // Fehlerbehandlung, Anzeigen der Fehlermeldung
        setError(
          `Fehler Download Ausgabebild: ${error.response?.status}, Nachricht: ${error.response?.statusText}`
        );
      });
  }, []); // Dieser Effekt wird nur beim ersten Rendern ausgeführt

  return (
    <div>
      {imageSrc ? <img src={imageSrc} alt="Abgerufenes Bild" /> : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
};

export default ImageFetcher;
