import { ThemeProvider } from "@mui/material/styles";
import createTheme from "@mui/material/styles/createTheme";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/Homepage.jsx";
import Gallery from "./pages/Gallery.jsx";
import StyleTransfer from "./pages/transfer.jsx";
import Login from "./pages/Login.jsx";

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

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/transfer" element={<StyleTransfer />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
