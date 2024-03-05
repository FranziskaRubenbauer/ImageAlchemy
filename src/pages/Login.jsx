import React, { useState, useEffect } from "react";
import sha256 from "crypto-js/sha256";
import { useNavigate } from "react-router-dom";

function Login() {
  let navigate = useNavigate();

  function handleCorrectLogin() {
    navigate("/");
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Gehashtes Passwort für die Demonstration (sollte normalerweise vom Server kommen)
  const correctUsername = "RubenbauerF";
  const correctPasswordHash =
    "f04737d03631daa798bfafa6414b8b7cd6796a95e0d83a282164b6b4f1a4162b"; //Hashwert im SHA-256

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Benutzername:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div>
        <label htmlFor="password">Passwort:</label>
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
  );
}

export default Login;
