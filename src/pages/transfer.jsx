import React from "react";
import DotsMobileStepper from "../components/transferstepper.jsx";

/**
 * Die StyleTransfer-Komponente dient als Wrapper oder Hauptansicht für den Style-Transfer-Prozess.
 * Innerhalb dieser Komponente wird der DotsMobileStepper integriert, der die verschiedenen Schritte des Style-Transfer-Prozesses steuert.
 */
export default function StyleTransfer() {
  return (
    <>
      <DotsMobileStepper></DotsMobileStepper>
    </>
  );
}
