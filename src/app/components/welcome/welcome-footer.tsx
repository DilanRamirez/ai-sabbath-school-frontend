"use client";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Box, Typography, Container, Link } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { disclaimer, politicaPrivacidad } from "@/app/lib/utils";

export default function WelcomeFooter() {
  const [open, setOpen] = useState(false);
  const [modalType, setModalType] = useState<"privacy" | "terms" | null>(null);

  const handleOpen = (type: "privacy" | "terms") => {
    setModalType(type);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setModalType(null);
  };

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 2,
      }}
    >
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="body1"
            sx={{
              mb: { xs: 1.5, md: 2 },
              fontSize: { xs: "0.9rem", md: "1rem" },
            }}
          >
            © 2025 Intelligent Sabbath+
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: { xs: 2, md: 3 },
              mb: { xs: 2, md: 3 },
              flexWrap: "wrap",
            }}
          >
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleOpen("privacy");
              }}
              sx={{
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
                fontSize: { xs: "0.85rem", md: "1rem" },
                "&:hover": {
                  color: "white",
                  textDecoration: "underline",
                },
              }}
            >
              Política de Privacidad
            </Link>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleOpen("terms");
              }}
              sx={{
                color: "rgba(255,255,255,0.8)",
                textDecoration: "none",
                fontSize: { xs: "0.85rem", md: "1rem" },
                "&:hover": {
                  color: "white",
                  textDecoration: "underline",
                },
              }}
            >
              Términos de Uso
            </Link>
          </Box>
        </Box>
      </Container>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          {modalType === "privacy"
            ? "Política de Privacidad"
            : "Términos de Uso"}
        </DialogTitle>
        <DialogContent dividers>
          {modalType === "privacy" ? (
            <ReactMarkdown>{politicaPrivacidad}</ReactMarkdown>
          ) : (
            <ReactMarkdown>{disclaimer}</ReactMarkdown>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
