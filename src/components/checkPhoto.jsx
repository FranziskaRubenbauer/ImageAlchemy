import React, { useState, useRef } from "react";
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

export default function ValidatePhoto({ photo, nextStep }) {
  async function downloadImage(imageSrc, filename = "download.png") {
    var blob;
    if (
      !(
        photo instanceof Blob ||
        photo instanceof File ||
        photo instanceof MediaSource
      )
    ) {
      // Argument ist gültig
      const fetchResponse = await fetch(imageSrc);
      blob = await fetchResponse.blob();
    }

    // Schritt 2: Erstellung einer URL für das Bild
    const blobUrl = URL.createObjectURL(blob);

    // Schritt 3: Download-Link erstellen
    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = filename;

    // Schritt 4: Auslösen des Downloads
    document.body.appendChild(downloadLink);
    downloadLink.click();

    // Schritt 5: Aufräumen
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(blobUrl);
  }

  return (
    <ThemeProvider theme={theme}>
      <img src={photo} width={"100%"} />
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={2}
      >
        <Button
          variant="contained"
          onClick={() => {
            nextStep(0);
          }}
        >
          Nochmal
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            if (photo) {
              downloadImage(photo, "contentImage");
            }
            nextStep(2);
          }}
        >
          Passt
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
