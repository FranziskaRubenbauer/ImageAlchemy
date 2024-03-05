import React, { useState } from "react";
import axios from "axios";

const FileUploader = ({ photo, setBool }) => {
  const [message, setMessage] = useState("");

  const handleUpload = () => {
    if (!photo) {
      setMessage("Bitte wählen Sie zuerst eine Datei aus.");
      return;
    }

    const url =
      "https://ki-server.oth-aw.de/user/5f1a/proxy/8810/upload-contentfile/";
    const token = "cbf883cb302e4b5c83c97dcd203b402e";
    const headers = { Authorization: `token ${token}` };

    const formData = new FormData();
    formData.append("file", photo);

    axios
      .post(url, formData, { headers })
      .then((response) => {
        if (response.status_code === 200) {
          setMessage(`Erfolgreich: ${response.data}`);
          setBool(true);
        } else {
          setMessage(
            `Fehler Upload Content Image: ${response.status_code}, Nachricht: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setMessage(
          `Fehler Upload Content Image: ${error.response?.status}, Nachricht: ${error.response?.statusText}`
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

export default FileUploader;
