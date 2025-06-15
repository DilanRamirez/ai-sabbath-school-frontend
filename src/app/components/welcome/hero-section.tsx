"use client";
import React from "react";
import { Box, Typography, Button, Container, Stack } from "@mui/material";
import { Login, PersonAdd } from "@mui/icons-material";

export default function HeroSection() {
  return (
    <Container
      maxWidth="lg"
      sx={{ mb: { xs: 6, md: 8 }, px: { xs: 2, sm: 3 } }}
    >
      <Box
        sx={{
          background:
            "linear-gradient(135deg, #2C3E50 0%, #34495E 50%, #2C3E50 100%)",
          color: "white",
          borderRadius: 4,
          py: { xs: 6, md: 8 },
          px: { xs: 2, md: 4 },
          mb: { xs: 6, md: 8 },
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
              "url('/placeholder.svg?height=600&width=1200') center/cover",
            opacity: 0.1,
            zIndex: 0,
          },
        }}
      >
        <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h1"
              sx={{
                mb: { xs: 2, md: 3 },
                fontSize: { xs: "1.75rem", sm: "2rem", md: "2.5rem" },
                fontWeight: 700,
                lineHeight: 1.2,
                px: { xs: 1, sm: 0 },
              }}
            >
              Tu Estudio de la Escuela Sabática, Ahora Más Profundo e
              Interactivo
            </Typography>

            <Typography
              variant="h6"
              sx={{
                mb: { xs: 3, md: 4 },
                opacity: 0.9,
                lineHeight: 1.6,
                fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.25rem" },
                maxWidth: "800px",
                mx: "auto",
                px: { xs: 1, sm: 0 },
              }}
            >
              Con la ayuda de inteligencia artificial y una experiencia
              amigable, descubre cada lección como nunca antes: explicaciones
              claras, reflexiones personales, y herramientas para crecer en la
              fe.
            </Typography>

            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 2, sm: 2 }}
              justifyContent="center"
              sx={{ mb: { xs: 2, md: 3 }, px: { xs: 2, sm: 0 } }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<Login />}
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
                Iniciar Sesión
              </Button>

              <Button
                variant="outlined"
                size="large"
                startIcon={<PersonAdd />}
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
                Crear Cuenta
              </Button>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Container>
  );
}
