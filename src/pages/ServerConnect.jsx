import React, { useEffect, useState } from "react";

/**
 * ServerConnectionTest stellt eine Verbindung zu einem WebSocket-Server her,
 * sendet eine Testnachricht und zeigt die Antwort des Servers an.
 */
function ServerConnectionTest() {
  const [response, setResponse] = useState(null);

  useEffect(() => {
    /**
     * Stellt eine WebSocket-Verbindung her, sendet eine Testnachricht und behandelt die Antwort.
     */
    async function connect() {
      //const token = "cbf883cb302e4b5c83c97dcd203b402e";
      //const uri = `wss://ki-server.oth-aw.de/user/5f1a/proxy/8810/ws/connection-test?token=${token}`;
      const uri = `ws://localhost:8810/ws/connection-test`;

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

export default ServerConnectionTest;
