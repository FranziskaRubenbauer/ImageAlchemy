import React, { useState, useRef } from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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

export default function ValidatePhoto({ photo, nextStep }) {
  return (
    <ThemeProvider theme={theme}>
      <img src={photo} width={"100%"} />
      <Stack
        direction="row"
        justifyContent="space-around"
        alignItems="flex-start"
        spacing={2}
      >
        <Button
          variant="contained"
          onClick={() => {
            nextStep(0);
          }}
        >
          Nochmal
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            nextStep(2);
          }}
        >
          Passt
        </Button>
      </Stack>
    </ThemeProvider>
  );
}
