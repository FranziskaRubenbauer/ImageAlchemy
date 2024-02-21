import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import emailjs from "@emailjs/browser";
import IconButton from "@mui/material/IconButton";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const [email, setEmail] = useState("");
  let navigate = useNavigate();

  function handleHomeClick() {
    navigate("/");
  }

  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_ytoe2hd",
        "kaS7QNg-hlc_SatH8",
        form.current,
        "kaS7QNg-hlc_SatH8"
      )
      .then(
        (result) => {
          // show the user a success message
        },
        (error) => {
          // show the user an error
        }
      );
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
      <IconButton aria-label="home" color="primary" sx={{ botto: 0, left: 0 }}>
        <HomeIcon onClick={handleHomeClick} />
      </IconButton>
    </>
  );
}
