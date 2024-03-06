import React, { useEffect } from "react";

function NotebookComponent() {
  useEffect(() => {
    async function connect() {
      const token = "cbf883cb302e4b5c83c97dcd203b402e";
      const uri = `wss://ki-server.oth-aw.de/user/5f1a/proxy/8810/ws/run-notebook?token=${token}`;

      try {
        const websocket = new WebSocket(uri);

        websocket.onopen = () => {
          console.log("WebSocket Verbindung geöffnet.");
          websocket.send("run notebook");
        };

        websocket.onmessage = async (event) => {
          const image_data = event.data;

          if (image_data === "Notebook erfolgreich ausgeführt.") {
            console.log("Schließe die WebSocket-Verbindung.");
            websocket.close();
          } else {
            const blob = new Blob([image_data], { type: "image/png" });
            const imageUrl = URL.createObjectURL(blob);

            // Speichern der empfangenen Bilddaten in einer Datei
            const anchor = document.createElement("a");
            anchor.href = imageUrl;
            anchor.download = "Test.png";
            anchor.click();

            console.log("Bild als Test.png gespeichert");
          }
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

    return () => {
      // Aufräumen der Komponente (z. B. WebSocket-Verbindung schließen)
    };
  }, []);

  return (
    <div>
      {/* Hier können Sie ggf. eine Darstellung für das empfangene Bild hinzufügen */}
    </div>
  );
}

export default NotebookComponent;
