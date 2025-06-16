"use client";
import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { PersonAdd, Login, Star } from "@mui/icons-material";

export default function CallToActionSection() {
  return (
    <Container
      maxWidth="lg"
      sx={{ mb: { xs: 6, md: 8 }, px: { xs: 2, sm: 3 } }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #8E44AD 0%, #9B59B6 50%, #8E44AD 100%)",
          color: "white",
          borderRadius: { xs: 3, md: 4 },
          p: { xs: 4, md: 6 },
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)",
            zIndex: 0,
          },
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Star sx={{ fontSize: { xs: 50, md: 60 }, color: "#F1C40F" }} />
          </Box>

          <Typography
            variant="h2"
            sx={{
              mb: { xs: 2, md: 3 },
              fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
              fontWeight: 700,
            }}
          >
            ✨ Comienza Tu Viaje Espiritual Interactivo
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: { xs: 3, md: 4 },
              fontSize: { xs: "1rem", md: "1.1rem" },
              lineHeight: 1.6,
              opacity: 0.9,
              maxWidth: "600px",
              mx: "auto",
              px: { xs: 1, sm: 0 },
            }}
          >
            No importa si eres nuevo o llevas años estudiando. Intelligent
            Sabbath+ está aquí para acompañarte cada día. Explora la lección,
            conecta con otros y deja que el Espíritu Santo hable a tu corazón.
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 2 }}
            justifyContent="center"
            sx={{ px: { xs: 1, sm: 0 } }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<PersonAdd />}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Crear Cuenta Gratis
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<Login />}
              sx={{
                borderColor: "white",
                color: "white",
                px: 4,
                py: 1.5,
                fontSize: "1.1rem",
                fontWeight: 600,
                "&:hover": {
                  borderColor: "white",
                  bgcolor: "rgba(255,255,255,0.1)",
                  transform: "translateY(-2px)",
                },
                transition: "all 0.3s ease",
              }}
            >
              Ya tengo una cuenta
            </Button>
          </Stack>
        </Box>
      </Box>
    </Container>
  );
}
