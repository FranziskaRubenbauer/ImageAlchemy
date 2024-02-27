import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import UserInfo from "./Login";

const theme = createTheme({
  palette: {
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

export default function HomeScreen() {
  let navigate = useNavigate();
  const [showHomeScreen, setShowHomeScreen] = useState(true);

  function handleGalleryClick() {
    navigate("/gallery");
  }
  function handleCreateClick() {
    navigate("/transfer");
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
              width: "100vw",
              height: "100vh",
              backgroundImage: "url(/DALL-E-StyleTransfer2.png)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Box
              sx={{
                pt: 16,
                textAlign: "center",
                textShadow: "5px 5px 8px black",
                alignContent: "center",
                fontFamily: "Papyrus",
                fontSize: "50px",
                fontWeight: "bold",
                color: "primary.main",
                width: "100%",
              }}
            >
              Image Alchemy
            </Box>
            <Box
              sx={{
                height: "40%",
              }}
            ></Box>
            <UserInfo></UserInfo>
            <Button
              variant="contained"
              onClick={() => {
                setShowHomeScreen(false);
              }}
              sx={{
                margin: "0 auto",
                textAlign: "center",
                width: "50%",
                color: "white",
                fontWeight: "bold",
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
              onClick={handleCreateClick}
              sx={{
                margin: "0 auto",
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
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
            <Button
              variant="contained"
              onClick={handleGalleryClick}
              sx={{
                margin: "0 auto",
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
              }}
            >
              Beispiele
            </Button>
          </Box>
        </ThemeProvider>
      )}
    </>
  );
}
