import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const duration = 140; // Zeit in Sekunden
    const interval = 1000; // Intervall in Millisekunden
    const steps = (duration * 1000) / interval; // Anzahl der Schritte
    const diff = 100 / steps; // Schrittgröße

    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        return Math.min(oldProgress + diff, 100);
      });
    }, interval);

    // Nach Ablauf der Zeit den Timer stoppen
    const timeout = setTimeout(() => {
      clearInterval(timer);
    }, duration * 1000);

    // Aufräumen
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <Box sx={{ margin: 2, width: "80vw" }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
