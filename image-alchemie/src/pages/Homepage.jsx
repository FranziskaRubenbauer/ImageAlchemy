import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00ea00",
    },
    secondary: {
      main: "#001aff",
    },
  },
});

export default function HomeScreen() {
  let navigate = useNavigate();
  const [showHomeScreen, setShowHomeScreen] = useState(true);

  function handleGalleryClick() {
    navigate("/gallery");
  }
  function handleCreateClick() {
    navigate("/");
  }

  return (
    <>
      {showHomeScreen ? (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              width: "100vw", // Breite des Viewports
              height: "100vh", // Höhe des Viewports
              backgroundImage: "url(/DALL-E-StyleTransfer2.png)", // URL des Hintergrundbildes
              backgroundSize: "cover", // sorgt dafür, dass das Bild den gesamten Container bedeckt
              backgroundPosition: "center", // zentriert das Bild
            }}
          >
            <Box
              sx={{
                pt: 4,
                textAlign: "center",
                textShadow: "3px 3px 5px black",
                alignContent: "center",
                fontFamily: "Papyrus",
                fontSize: "40px",
                fontWeight: "bold",
                color: "#00ea00",
                width: "100%",
              }}
            >
              Image Alchemy
            </Box>
            <Box
              sx={{
                height: "60%",
              }}
            ></Box>
            <Button
              variant="contained"
              onClick={() => {
                setShowHomeScreen(false);
              }}
              sx={{
                margin: "0 auto",
                textAlign: "center",
                width: "50%",
              }}
            >
              Start
            </Button>
          </Box>
        </ThemeProvider>
      ) : (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100vw",
              height: "100vh",
              backgroundColor: "#7b5d42",
            }}
          >
            <Box
              sx={{
                width: "100%",
                height: "20%",
              }}
            ></Box>
            <Button
              variant="contained"
              onClick={() => {
                alert("clicked");
              }}
            >
              Erstellen Sie Ihr eigenes Bild
            </Button>
            <Box
              sx={{
                width: "100%",
                height: "10%",
              }}
            ></Box>
            <Box
              sx={{
                width: "100%",
                height: "30%",
                backgroundImage: "url(/Image-Alchemy.png)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></Box>
            <Box
              sx={{
                width: "100%",
                height: "10%",
              }}
            ></Box>
            <Button variant="contained" onClick={handleGalleryClick}>
              Beispiele
            </Button>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
}
