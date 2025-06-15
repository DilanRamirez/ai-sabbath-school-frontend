/* eslint-disable no-undef */
"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

const DISCLAIMER_KEY = "disclaimerAccepted";

const Disclaimer: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(DISCLAIMER_KEY);
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(DISCLAIMER_KEY, "true");
    setVisible(false);
  };

  return (
    <Dialog
      open={visible}
      disableEscapeKeyDown
      onClose={(event, reason) => {
        if (reason === "backdropClick") return;
      }}
      aria-labelledby="disclaimer-dialog-title"
    >
      <DialogTitle id="disclaimer-dialog-title">
        ¡Bienvenido a tu experiencia de estudio!
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body2">
          Esta aplicación está diseñada con fines educativos y espirituales,
          especialmente para el estudio de la Intelligent Sabbath+. La
          información proporcionada por la aplicación, incluyendo explicaciones
          generadasz`` por IA, referencias bíblicas y comentarios, debe ser
          usada como apoyo para el estudio personal o en grupo, pero no
          reemplaza el estudio profundo de la Biblia, la oración ni la guía del
          Espíritu Santo. Las interpretaciones ofrecidas pueden variar y no
          deben considerarse como una autoridad doctrinal oficial. <br /> <br />
          Al usar esta aplicación, aceptas que es una herramienta complementaria
          y no un sustituto de la comunión con Dios ni de la dirección
          espiritual pastoral. Siempre verifica lo que dice la inteligencia
          artificial con la Biblia y no des por sentado nada. Este recurso está
          diseñado para ayudarte a entender mejor la lección y ciertos pasajes
          difíciles, pero nunca debe sustituir el estudio personal de la Palabra
          de Dios.
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={handleAccept}>
          Acepto
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Disclaimer;
