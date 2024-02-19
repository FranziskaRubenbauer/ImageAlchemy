import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00ea00",
    },
    secondary: {
      main: "#001aff",
    },
  },
});

export default function CameraCapture({ setImage, nextStep }) {
  const camera = useRef(null);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ height: "100vh" }}>
        <Camera ref={camera} aspectRatio={16 / 9} />
        <Button
          variant="contained"
          onClick={() => {
            setImage(camera.current.takePhoto());
            nextStep(1);
          }}
        >
          Foto schießen
        </Button>
      </Box>
    </ThemeProvider>
  );
}
