import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

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
 * SaveScreen bietet eine Benutzeroberfläche, auf der Benutzer entscheiden können, ob sie das generierte Bild per E-Mail erhalten möchten
 * oder ob sie einen anderen Stil ausprobieren möchten. Es zeigt das Bild und zwei Buttons für die jeweiligen Optionen.
 *
 * @param {Object} props - Die Props für die SaveScreen-Komponente.
 * @param {Function} props.setActiveStep - Eine Funktion, um den aktuellen Schritt im Prozess zu setzen.
 * @param {string} props.outputImage - Die URL des generierten Bildes, das angezeigt werden soll.
 */
export default function SaveScreen({ setActiveStep, outputImage }) {
  return (
    <ThemeProvider theme={theme}>
      <Typography
        variant="h5"
        sx={{
          textAlign: "center",
          color: "primary.main",
          pb: 4,
        }}
      >
        Wollen Sie sich das Bild per E-Mail zuschicken lassen oder lieber ein
        anderes Stilbild versuchen?
      </Typography>
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
        <img src={outputImage} alt="dummy" height={"300px"}></img>
      </Container>
      <Grid container spacing={2} direction="row" justifyContent="space-around">
        <Grid item xs="auto">
          <Button
            variant="contained"
            onClick={() => {
              setActiveStep(2);
            }}
          >
            Anderer Stil
          </Button>
        </Grid>
        <Grid item xs="auto">
          <Button
            variant="contained"
            onClick={() => {
              setActiveStep(5);
            }}
          >
            Per E-Mail schicken
          </Button>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
