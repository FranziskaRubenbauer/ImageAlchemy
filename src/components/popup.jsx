import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box } from "@mui/system";

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
        sx={{
          width: "400px",
          height: "400px",
        }}
      >
        <Box
          component="img"
          src={`/transfer-beispiele/Eingabebilder${imgNr}.png`}
          sx={{ width: "100%", height: "400px", fill: "scale" }}
        ></Box>
      </Popover>
    </div>
  );
}
