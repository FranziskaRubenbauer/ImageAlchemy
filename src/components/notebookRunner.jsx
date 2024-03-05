import React, { useState } from "react";
import axios from "axios";

const NotebookRunner = ({ setBool }) => {
  const [message, setMessage] = useState("");

  const handleRunNotebook = () => {
    const url =
      "https://ki-server.oth-aw.de/user/5f1a/proxy/8810/run-notebook/";
    const token = "cbf883cb302e4b5c83c97dcd203b402e";
    const headers = { Authorization: `token ${token}` };

    axios
      .post(url, {}, { headers })
      .then((response) => {
        setBool(true);
        if (response.status === 200) {
          setMessage("Notebook wurde erfolgreich auf dem Server ausgeführt.");
        } else {
          setMessage(
            `Fehler Notebook Runner: ${response.status}, Nachricht: ${response.data}`
          );
        }
      })
      .catch((error) => {
        setBool(true);
        setMessage(
          `Fehler Notebook Runner: ${error.response?.status}, Nachricht: ${error.response?.statusText}`
        );
      });
  };

  return (
    <div>
      <button onClick={handleRunNotebook}>Notebook ausführen</button>
      <p>{message}</p>
    </div>
  );
};

export default NotebookRunner;
