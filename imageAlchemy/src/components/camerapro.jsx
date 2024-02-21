import React, { useState, useRef } from "react";
import { Camera } from "react-camera-pro";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "rgb(248,148,0)",
      light: "rgb(248,187,107)",
    },
    secondary: {
      main: "rgb(139,129,121)",
      light: "rgb(203,196,190)",
    },
  },
});

export default function CameraCapture({ setImage, nextStep }) {
  const camera = useRef(null);

  return (
    <ThemeProvider theme={theme}>
      <Stack
        direction="column"
        justifyContent="space-evenly"
        alignItems="center"
        spacing={4}
      >
        <Camera ref={camera} aspectRatio={16 / 9} />
        <Button
          variant="contained"
          sx={{ alignContent: "center", justifyContent: "center" }}
          onClick={() => {
            setImage(camera.current.takePhoto());
            nextStep(1);
          }}
        >
          Foto schießen
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
