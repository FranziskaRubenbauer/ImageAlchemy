import * as React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const diff = 0.55;
        return Math.min(oldProgress + diff, 100);
      });
    }, 1000);

    if (progress === 100) {
      return () => {
        clearInterval(timer);
      };
    }
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
