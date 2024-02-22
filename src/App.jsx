import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/Homepage.jsx";
import Gallery from "./pages/Gallery.jsx";
import StyleTransfer from "./pages/transfer.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/transfer" element={<StyleTransfer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
