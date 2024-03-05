import React, { useState } from "react";
import axios from "axios";

const StyleFileUploader = ({ image, setBool }) => {
  const [message, setMessage] = useState("");

  const handleUpload = () => {
    if (!image) {
      setMessage("Bitte wählen Sie zuerst eine Datei aus.");
      return;
    }

    const url =
      "https://ki-server.oth-aw.de/user/5f1a/proxy/8810/upload-stylefile/";
    const token = "cbf883cb302e4b5c83c97dcd203b402e";
    const headers = { Authorization: `token ${token}` };

    const formData = new FormData();
    formData.append("file", image);

    axios
      .post(url, formData, { headers })
      .then((response) => {
        if (response.status === 200) {
          setMessage(`Erfolgreich: ${response.data}`);
          setBool(true);
        } else {
          setMessage(
            `Fehler Upload Style Image: ${response.status}, Nachricht: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(
          `Fehler Upload Style Image: ${error.response?.status}, Nachricht: ${error.response?.statusText}`
        );
      });
  };

  return (
    <div>
      <button onClick={handleUpload}>Hochladen</button>
      <p>{message}</p>
    </div>
  );
};

export default StyleFileUploader;
