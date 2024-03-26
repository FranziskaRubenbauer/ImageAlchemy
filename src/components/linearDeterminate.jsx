import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

/**
 * LinearDeterminate ist eine Komponente, die eine Fortschrittsanzeige implementiert,
 * welche über einen festgelegten Zeitraum hinweg kontinuierlich von 0% auf 100% fortschreitet.
 * Die Komponente nutzt einen useEffect-Hook, um die Fortschrittsaktualisierung
 * durch einen Timer zu steuern und diesen am Ende des Zeitraums sauber zu entfernen.
 */
export default function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0); // Der aktuelle Fortschritt in Prozent

  React.useEffect(() => {
    const duration = 140; // Die Gesamtdauer des Fortschritts in Sekunden
    const interval = 1000; // Das Update-Intervall in Millisekunden
    const steps = (duration * 1000) / interval; // Die Gesamtanzahl der Schritte bis 100%
    const diff = 100 / steps; // Der Fortschritt pro Schritt in Prozent

    const timer = setInterval(() => {
      setProgress((oldProgress) => Math.min(oldProgress + diff, 100)); // Aktualisiert den Fortschritt
    }, interval);

    // Timer stoppen, wenn der Fortschritt 100% erreicht oder die Komponente unmountet wird
    const timeout = setTimeout(() => clearInterval(timer), duration * 1000);

    // Aufräumen bei Unmount der Komponente
    return () => {
      clearInterval(timer);
      clearTimeout(timeout);
    };
  }, []); // Der leere Dependency-Array stellt sicher, dass der Effekt nur beim Mounten ausgeführt wird

  return (
    <Box sx={{ margin: 2, width: "80vw" }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
