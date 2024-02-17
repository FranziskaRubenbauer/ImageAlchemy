import React, { useRef, useState } from "react";
import { Button, Paper, Box } from "@mui/material";

function CameraComponent() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCaptured, setIsCaptured] = useState(false);

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("Fehler beim Zugriff auf die Kamera: ", err);
      });
  };

  const captureImage = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    setIsCaptured(true);

    // Stoppen des Video-Streams
    let stream = video.srcObject;
    let tracks = stream.getTracks();
    tracks.forEach((track) => track.stop());
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      {!isCaptured && (
        <Box>
          <video ref={videoRef} width="640" height="480" autoPlay></video>
          <Button variant="contained" color="primary" onClick={captureImage}>
            Foto machen
          </Button>
        </Box>
      )}
      {isCaptured && (
        <Paper elevation={3} sx={{ display: "inline-block" }}>
          <canvas ref={canvasRef} width="640" height="480"></canvas>
        </Paper>
      )}
    </Box>
  );
}

export default CameraComponent;
