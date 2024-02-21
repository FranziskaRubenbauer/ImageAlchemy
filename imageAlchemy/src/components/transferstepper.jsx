import * as React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import CameraCapture from "./camerapro";
import TitlebarImageList from "./imageList";
import ValidatePhoto from "./checkPhoto";
import ContactUs from "./email";
import SaveScreen from "./saveScreen";

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

export default function DotsMobileStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [photo, setPhoto] = React.useState(null);
  const [styleImage, setStyleImage] = React.useState(null);

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
        <ValidatePhoto photo={photo} nextStep={setActiveStep}></ValidatePhoto>
      ),
    },
    {
      label: "Schritt 3: Wählen Sie ein Stilbild aus",
      content: (
        <>
          <TitlebarImageList
            setStyleImage={setStyleImage}
            nextStep={setActiveStep}
          ></TitlebarImageList>
        </>
      ),
    },
    {
      label: "Schritt 4: Die Ki führt den Stiltranfer durch",
      content: <></>,
    },
    {
      label: "Fertig.",
      content: <SaveScreen setActiveStep={setActiveStep}></SaveScreen>,
    },
    {
      label: "Bitte füllen Sie das folgende Formular aus.",
      content: <ContactUs></ContactUs>,
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: "100vw" }}>
        <Stack
          direction="column"
          alignItems="stretch"
          justifyContent="space-evenly"
          padding={2}
        >
          <Typography
            variant="h3"
            sx={{
              textAlign: "center",
              color: "primary.main",
            }}
          >
            {steps[activeStep].label}
          </Typography>
          <Box>{steps[activeStep].content}</Box>

          <MobileStepper
            variant="dots"
            steps={6}
            position="bottom"
            activeStep={activeStep}
            sx={{ width: "100vw" }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === 5}
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
    </ThemeProvider>
  );
}
