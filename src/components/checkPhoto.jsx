import React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";

// Definiert ein individuelles Theme für die MUI-Komponenten mit den OTH-Farben
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

/**
 * ValidatePhoto stellt eine Benutzeroberfläche zur Verfügung, um ein aufgenommenes Foto zu validieren.
 * Es ermöglicht dem Benutzer, das Foto zu akzeptieren oder ein neues Foto aufzunehmen.
 *
 * @param {string} photo - Die URL des aufgenommenen Fotos.
 * @param {Function} nextStep - Eine Funktion, um den nächsten Schritt im Prozess zu steuern.
 */
export default function ValidatePhoto({ photo, nextStep }) {
  /**
   * Lädt das übergebene Bild herunter, indem ein temporärer Download-Link erstellt wird.
   * Funktioniert für Bilder, die als Blob, File, MediaSource oder URL vorhanden sind.
   *
   * @param {string} imageSrc - Die Quelle des Bildes, die heruntergeladen werden soll.
   * @param {string} [filename='download.png'] - Der Dateiname für das heruntergeladene Bild.
   */
  async function downloadImage(imageSrc, filename = "download.png") {
    var blob;
    if (
      !(
        photo instanceof Blob ||
        photo instanceof File ||
        photo instanceof MediaSource
      )
    ) {
      const fetchResponse = await fetch(imageSrc);
      blob = await fetchResponse.blob();
    }

    const blobUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = blobUrl;
    downloadLink.download = filename;
    document.body.appendChild(downloadLink);
    //downloadLink.click();
    document.body.removeChild(downloadLink);
    URL.revokeObjectURL(blobUrl);
  }

  return (
    <ThemeProvider theme={theme}>
      <img src={photo} alt="Validated Photo" width={"100%"} />
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
              downloadImage(photo, "contentImage.png");
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
