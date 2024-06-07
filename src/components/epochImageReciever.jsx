import React, { useState, useEffect, useRef } from "react";
import { Container } from "@mui/material";

function EpochImageReceiver() {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    const connect = async () => {
      const token = "cbf883cb302e4b5c83c97dcd203b402e";
      const uri = `wss://ki-server.oth-aw.de/user/5f1a/proxy/8810/ws/epochenbild?token=${token}`;
      try {
        const websocket = new WebSocket(uri);

        websocket.onopen = () => {
          console.log("WebSocket Verbindung geöffnet.");
          websocket.send("send epochimage");
        };

        websocket.onmessage = async (event) => {
          if (event.data instanceof Blob) {
            const imageBlob = event.data;
            const imageObjectURL = URL.createObjectURL(imageBlob);
            setImageSrc(imageObjectURL); // Setzt die Bild-URL für das <img>-Tag
          } else {
            console.log(event.data); // Verarbeitung der Server-Antwort
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
    };

    connect();
  }, []);

  return (
    <Container
      fixed
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignContent: "center",
        pb: 3,
      }}
    >
      {imageSrc && <img src={imageSrc} alt="Epochenbild" height={"300px"} />}
    </Container>
  );
}

export default EpochImageReceiver;
