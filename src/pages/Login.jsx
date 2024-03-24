import React, { useState, useEffect } from "react";
import sha256 from "crypto-js/sha256";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

function Login() {
  let navigate = useNavigate();

  function handleCorrectLogin() {
    navigate("/");
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const correctUsername = "RubenbauerF";
  const correctPasswordHash =
    "f04737d03631daa798bfafa6414b8b7cd6796a95e0d83a282164b6b4f1a4162b";

  const hashPassword = (password) => {
    return sha256(password).toString();
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    //e.preventDefault();

    const hashedPassword = await hashPassword(password);

    if (
      username === correctUsername &&
      hashedPassword === correctPasswordHash
    ) {
      // Erfolgreiche Authentifizierung
      setIsLoggedIn(true);
      setLoginError("");
      console.log("Erfolgreich angemeldet!");
    } else {
      // Fehler bei der Authentifizierung
      setLoginError("Falscher Benutzername oder Passwort");
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        backgroundImage: "url(/DALL-E-StyleTransfer2.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box sx={{ height: "50vh" }}></Box>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          background: "black",
          padding: 4,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "200px",
          }}
        >
          <label
            htmlFor="username"
            style={{
              width: "100%",
              color: "orange",
              fontSize: "20pt",
              fontWeight: "bold",
            }}
          >
            Benutzername:
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "200px",
          }}
        >
          <label
            htmlFor="password"
            style={{
              width: "100%",
              color: "orange",
              fontSize: "20pt",
              fontWeight: "bold",
            }}
          >
            Passwort:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {loginError && <div style={{ color: "red" }}>{loginError}</div>}
        <button type="submit">Anmelden</button>
      </form>
    </Box>
  );
}

export default Login;
