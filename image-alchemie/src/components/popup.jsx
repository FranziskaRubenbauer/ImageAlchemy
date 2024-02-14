import * as React from "react";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function BasicPopover({ anchorEl, handleClose, open, imgNr }) {
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        anchorReference="anchorPosition"
        anchorPosition={{ top: 0, left: 0 }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        onClose={handleClose}
      >
        <img
          srcSet={`/transfer-beispiele/${imgNr}_Eingabe.png?w=16&h=16&fit=crop&auto=format&dpr=2 2x`}
          src={`/transfer-beispiele/${imgNr}_Eingabe.png?w=16&h=164&fit=crop&auto=format`}
          alt={imgNr}
          loading="lazy"
          sx={{ p: 2, width: "50px" }}
        />
      </Popover>
    </div>
  );
}
