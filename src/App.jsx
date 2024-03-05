import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/Homepage.jsx";
import Gallery from "./pages/Gallery.jsx";
import StyleTransfer from "./pages/transfer.jsx";
import Login from "./pages/Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeScreen />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/transfer" element={<StyleTransfer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
