import React, { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const images = [
  "/transfer-beispiele/ausgabebild1.png",
  "/transfer-beispiele/Ausgabebild3.png",
  "/transfer-beispiele/Ausgabebild5.png",
  "/transfer-beispiele/Ausgabebild9.png",
  "/transfer-beispiele/Ausgabebild12.png",
  "/transfer-beispiele/Ausgabebild13.png",
  "/transfer-beispiele/Ausgabebild15.png",
  "/transfer-beispiele/Ausgabebild16.png",
  "/transfer-beispiele/Ausgabebild17.png",
  "/transfer-beispiele/Ausgabebild18.png",
  "/transfer-beispiele/Ausgabebild19.png",
  "/transfer-beispiele/Ausgabebild23.png",
  "/transfer-beispiele/Ausgabebild26.png",
  "/transfer-beispiele/Ausgabebild27.png",
  "/transfer-beispiele/Ausgabebild28.png",
  "/transfer-beispiele/Ausgabebild36.png",
  "/transfer-beispiele/Ausgabebild39.png",
  "/transfer-beispiele/Ausgabebild42.png",
  "/transfer-beispiele/Ausgabebild43.png",
];

function ImageSlideshow() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Wechselt das Bild alle 3 Sekunden
    return () => clearInterval(timer);
  }, []);

  const goToPrevious = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  return (
    <Box
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <IconButton onClick={goToPrevious} aria-label="Vorheriges Bild">
        <ArrowBackIosIcon />
      </IconButton>
      <img
        src={images[currentImageIndex]}
        alt="Diashow Bild"
        style={{ maxHeight: "400px", maxWidth: "100%" }}
      />
      <IconButton onClick={goToNext} aria-label="Nächstes Bild">
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
}

export default ImageSlideshow;
