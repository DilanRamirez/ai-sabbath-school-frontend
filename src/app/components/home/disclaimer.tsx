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
import { disclaimer } from "@/app/lib/utils";

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
        <Typography variant="body2">{disclaimer}</Typography>
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
