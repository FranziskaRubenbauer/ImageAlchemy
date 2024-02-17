import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CameraCapture from "./camerapro";

export default function DotsMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const steps = [
    {
      label: "Schritt 1: Nehmen Sie ein Foto von sich auf",
      content: <CameraCapture></CameraCapture>,
    },
    {
      label: "Schritt 2: Wählen Sie ein Stilbild aus",
      content: <></>,
    },
    {
      label: "Schritt 3: Die Ki führt den Stiltranfer durch.",
      content: <></>,
    },
    {
      label:
        "Fertig. Wollen Sie sich das Bild per E-Mail zuschicken lassen oder lieber ein anderes  Stilbild versuchen?",
      content: <></>,
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "80vh",
          width: "100vw",
          pl: 2,
        }}
      >
        <Typography>{steps[activeStep].label}</Typography>
        <Box>{steps[activeStep].content}</Box>
      </Box>
      <MobileStepper
        variant="dots"
        steps={4}
        position="bottom"
        activeStep={activeStep}
        sx={{ width: "100vw", backgroundColor: "#00ea00", color: "black" }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === 3}
            sx={{ color: "black" }}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft />
            ) : (
              <KeyboardArrowRight />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{ color: "black" }}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight />
            ) : (
              <KeyboardArrowLeft />
            )}
            Back
          </Button>
        }
      />
    </div>
  );
}
