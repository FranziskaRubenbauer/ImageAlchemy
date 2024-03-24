import React, { useEffect, useState } from "react";

function NotebookComponent() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    async function connect() {
      const token = "cbf883cb302e4b5c83c97dcd203b402e";
      const uri = `wss://ki-server.oth-aw.de/user/5f1a/proxy/8810/ws/connection-test?token=${token}`;

      try {
        const websocket = new WebSocket(uri);

        websocket.onopen = () => {
          console.log("WebSocket Verbindung geöffnet.");
          websocket.send("connection test");
        };

        websocket.onmessage = async (event) => {
          const responseData = event.data;
          console.log(responseData);
          setResponse(responseData);
          websocket.close();
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

    connect();
  }, []);

  return <div>{response}</div>;
}

export default NotebookComponent;
