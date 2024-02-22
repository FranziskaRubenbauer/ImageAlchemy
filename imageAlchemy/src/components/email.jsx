import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import emailjs from "@emailjs/browser";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function EMail() {
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  function handleHomeClick() {
    navigate("/");
  }

  function sendEmail(e) {
    Email.send({
      SecureToken: "f14d117d-ed8a-4512-8c2f-14cf0f94ac11",
      To: email,
      From: "f.rubenbauer@oth-aw.de",
      Subject: "Ihr Styletransfer Bild",
      Body: "Vielen Dank, dass Sie die Styletransfer-App der OTH Amberg-Weiden verwendet haben. Im Anhang finden Sie ihr Bild.",
      Attachments: [
        {
          name: "smtpjs.png",
          path: "https://networkprogramming.files.wordpress.com/2017/11/smtpjs.png",
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
          onClick={sendEmail}
          sx={{ m: 2, color: "white" }}
        >
          E-Mail senden
        </Button>
      </FormControl>
      <IconButton
        aria-label="home"
        color="primary"
        sx={{ botto: 0, left: 0 }}
        onClick={handleHomeClick}
      >
        <HomeIcon />
      </IconButton>
    </>
  );
}

/* SmtpJS.com - v3.0.0 */
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
