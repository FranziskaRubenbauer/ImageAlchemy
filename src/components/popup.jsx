import * as React from "react";
import Popover from "@mui/material/Popover";
import { Box } from "@mui/system";

/**
 * BasicPopover ist eine Komponente, die einen MUI Popover anzeigt. Der Popover enthält ein Bild, das basierend auf der übergebenen Bildnummer (`imgNr`) geladen wird.
 * Der Popover öffnet sich abhängig vom Zustand der `open`-Prop und kann durch die `handleClose`-Funktion geschlossen werden.
 *
 * @param {Object} props - Die Props für die BasicPopover-Komponente.
 * @param {HTMLElement} props.anchorEl - Das Element, an dem der Popover ausgerichtet wird.
 * @param {Function} props.handleClose - Eine Funktion, die aufgerufen wird, um den Popover zu schließen.
 * @param {boolean} props.open - Ein Boolescher Wert, der bestimmt, ob der Popover geöffnet ist.
 * @param {number} props.imgNr - Die Nummer des anzuzeigenden Bildes, das Teil des Bildpfades ist.
 */
export default function BasicPopover({ anchorEl, handleClose, open, imgNr }) {
  const id = open ? "simple-popover" : undefined; // Die ID für den Popover, basierend auf dem `open`-Zustand

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
