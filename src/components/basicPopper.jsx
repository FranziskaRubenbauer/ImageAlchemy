import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import ServerConnectionTest from "../pages/ServerConnect";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";

/**
 * SimplePopper ist eine Komponente, die ein Popper-UI-Element bereitstellt.
 * Sie zeigt einen Informations-IconButton, der beim Klicken ein Popper-Element mit Informationen über die Serverkommunikation anzeigt.
 */
export default function SimplePopper() {
  // State-Hook, der verwendet wird, um das Element zu verfolgen, an dem der Popper ausgerichtet ist.
  const [anchorEl, setAnchorEl] = React.useState(null);

  /**
   * Behandelt Klick-Ereignisse auf den IconButton und setzt das Anchor-Element für den Popper.
   * @param {Event} event - Das Klick-Ereignis.
   */
  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  // Bestimmt, ob der Popper offen ist basierend auf dem Vorhandensein eines Anchor-Elements.
  const open = Boolean(anchorEl);
  // Definiert die ID für den Popper, falls dieser offen ist.
  const id = open ? "simple-popper" : undefined;

  return (
    <div>
      <IconButton aria-describedby={id} type="button" onClick={handleClick}>
        <InfoIcon />
      </IconButton>
      <Popper id={id} open={open} anchorEl={anchorEl}>
        <Box sx={{ border: 1, p: 1, bgcolor: "black" }}>
          <ServerConnectionTest></ServerConnectionTest>
        </Box>
      </Popper>
    </div>
  );
}
