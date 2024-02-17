import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import Box from "@mui/material/Box";

export default function CameraCapture() {
  const camera = useRef(null);
  const [image, setImage] = useState(null);

  return (
    <Box sx={{ height: "80vh" }}>
      <Camera ref={camera} />
      <button onClick={() => setImage(camera.current.takePhoto())}>
        Take photo
      </button>
      <img src={image} alt="Taken photo" />
    </Box>
  );
}
