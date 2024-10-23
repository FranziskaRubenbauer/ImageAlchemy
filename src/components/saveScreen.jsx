import * as React from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

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
    <>
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
        <img src={outputImage} alt="dummy" height={"60%"}></img>
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
    </>
  );
}
