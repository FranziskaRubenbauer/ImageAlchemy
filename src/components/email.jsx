import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

//EmailAPI Passwort: 8364BF7C0F60716DBD3E446B50D2D4C5F67B
/**
 * Die EMail-Komponente bietet eine Benutzeroberfläche, um eine E-Mail mit einem Bildanhang zu senden.
 * Sie enthält ein Eingabefeld für die E-Mail-Adresse und einen Button zum Senden der E-Mail.
 *
 * @param {string} image - Das Bild, das als Anhang mit der E-Mail gesendet wird.
 */
export default function EMail({ image }) {
  const [email, setEmail] = useState(""); // E-Mail-Adresse des Benutzers
  let navigate = useNavigate(); // Navigationsfunktion von React Router

  /**
   * Ruft die sendEmail-Funktion auf, um eine E-Mail mit dem Bild als Anhang zu senden.
   */
  function handleSendClick() {
    sendEmail(image);
  }

  /**
   * Navigiert den Benutzer zurück zur Startseite.
   */
  function handleHomeClick() {
    navigate("/home");
  }

  /**
   * Sendet eine E-Mail mit einem Bild als Anhang an die im Zustand gespeicherte E-Mail-Adresse.
   * Credit: „SmtpJS.com - Send Email from JavaScript“. Zugegriffen: 20. Februar 2024. [Online]. Verfügbar unter: https://smtpjs.com/
   *
   * @param {string} imageAtt - Das Bild, das als Anhang gesendet wird.
   */
  function sendEmail(imageAtt) {
    Email.send({
      SecureToken: "f2717565-62f2-475e-9bfb-e754ab5b0574",
      To: email,
      From: "f.rubenbauer@oth-aw.de",
      Subject: "Ihr Styletransfer Bild",
      Body: "Vielen Dank, dass Sie die Styletransfer-App der OTH Amberg-Weiden verwendet haben. Im Anhang finden Sie ihr Bild.",
      Attachments: [
        {
          name: "styletransferImage.png",
          data: imageAtt,
        },
      ],
    }).then((message) => alert(message));
  }

  return (
    <>
      <FormControl sx={{ display: "flex", justifyContent: "center", m: 2 }}>
        <TextField
          required
          id="outlined-required"
          label="E-Mail-Adresse"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ m: 2 }}
        />
        <Button
          variant="contained"
          onClick={handleSendClick}
          sx={{ m: 2, color: "white" }}
        >
          E-Mail senden
        </Button>
      </FormControl>
      <Box sx={{ width: "100%", textAlign: "center" }}>
        Bitte auch im Spam-Ordner nachschauen.
      </Box>

      <IconButton
        aria-label="home"
        color="primary"
        sx={{ bottom: 0, left: 0 }}
        onClick={handleHomeClick}
      >
        <HomeIcon />
      </IconButton>
    </>
  );
}

/* SmtpJS.com - v3.0.0 */
/* Credit: „SmtpJS.com - Send Email from JavaScript“. Zugegriffen: 20. Februar 2024. [Online]. Verfügbar unter: https://smtpjs.com/*/
var Email = {
  send: function (a) {
    return new Promise(function (n, e) {
      (a.nocache = Math.floor(1e6 * Math.random() + 1)), (a.Action = "Send");
      var t = JSON.stringify(a);
      Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) {
        n(e);
      });
    });
  },
  ajaxPost: function (e, n, t) {
    var a = Email.createCORSRequest("POST", e);
    a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"),
      (a.onload = function () {
        var e = a.responseText;
        null != t && t(e);
      }),
      a.send(n);
  },
  ajax: function (e, n) {
    var t = Email.createCORSRequest("GET", e);
    (t.onload = function () {
      var e = t.responseText;
      null != n && n(e);
    }),
      t.send();
  },
  createCORSRequest: function (e, n) {
    var t = new XMLHttpRequest();
    return (
      "withCredentials" in t
        ? t.open(e, n, !0)
        : "undefined" != typeof XDomainRequest
        ? (t = new XDomainRequest()).open(e, n)
        : (t = null),
      t
    );
  },
};
