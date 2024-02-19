import * as React from "react";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CameraCapture from "./camerapro";

export default function DotsMobileStepper() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [photo, setPhoto] = React.useState(null);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    {
      label: "Schritt 1: Nehmen Sie ein Foto von sich auf.",
      content: (
        <CameraCapture
          setImage={setPhoto}
          nextStep={setActiveStep}
        ></CameraCapture>
      ),
    },
    {
      label: "Schritt 2: Überprüfen Sie das Bild.",
      content: (
        <>
          <img src={photo} width={"100%"} />
        </>
      ),
    },
    {
      label: "Schritt 3: Wählen Sie ein Stilbild aus",
      content: <></>,
    },
    {
      label: "Schritt 3: Die Ki führt den Stiltranfer durch",
      content: <></>,
    },
    {
      label:
        "Fertig. Wollen Sie sich das Bild per E-Mail zuschicken lassen oder lieber ein anderes  Stilbild versuchen?",
      content: <></>,
    },
  ];

  return (
    <Box sx={{ width: "100vw" }}>
      <Stack
        direction="column"
        alignItems="stretch"
        justifyContent="space-evenly"
        spacing={6}
        padding={2}
      >
        <Typography
          variant="h2"
          sx={{
            color: "#00ea00",
            textAlign: "center",
          }}
        >
          {steps[activeStep].label}
        </Typography>
        <Box>{steps[activeStep].content}</Box>

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
      </Stack>
    </Box>
  );
}
