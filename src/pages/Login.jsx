import React, { useState, useEffect } from "react";
import sha256 from "crypto-js/sha256";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";

/**
 * Die Login-Komponente stellt ein Anmeldeformular zur Verfügung.
 * Benutzer können ihren Benutzernamen und ihr Passwort eingeben, um sich anzumelden.
 * Bei erfolgreicher Authentifizierung wird der Benutzer zur Startseite weitergeleitet.
 */
function Login() {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  const correctUsername = "RubenbauerF";
  const correctPasswordHash =
    "f04737d03631daa798bfafa6414b8b7cd6796a95e0d83a282164b6b4f1a4162b";

  /**
   * Hashes a password using SHA-256.
   * Credit: E. Vosberg, „crypto-js“, npm. Zugegriffen: 25. März 2024. [Online]. Verfügbar unter: https://www.npmjs.com/package/crypto-js
   * @param {string} password - Das Passwort, das gehasht werden soll.
   * @returns {string} - Der Hash-Wert des Passworts.
   */
  const hashPassword = (password) => {
    return sha256(password).toString();
  };

  /**
   * Behandelt Änderungen im Benutzernamen-Eingabefeld.
   * @param {Event} e - Das Event, das die Änderung ausgelöst hat.
   */
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  /**
   * Behandelt Änderungen im Passwort-Eingabefeld.
   * @param {Event} e - Das Event, das die Änderung ausgelöst hat.
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Behandelt das Absenden des Anmeldeformulars.
   * @param {Event} e - Das Event, das das Absenden ausgelöst hat.
   */
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

  // Beobachtet den Anmeldestatus und leitet bei Bedarf um
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
