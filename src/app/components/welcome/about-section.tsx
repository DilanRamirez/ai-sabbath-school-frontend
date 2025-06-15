import React from "react";
import { Box, Typography, Paper, Container } from "@mui/material";
import { MenuBook } from "@mui/icons-material";

export default function AboutSection() {
  return (
    <Container
      maxWidth="lg"
      sx={{ mb: { xs: 6, md: 8 }, px: { xs: 2, sm: 3 } }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: { xs: 3, md: 4 },
          textAlign: "center",
          background: "linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)",
        }}
      >
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "primary.main",
            color: "white",
            borderRadius: "50%",
            width: { xs: 60, md: 80 },
            height: { xs: 60, md: 80 },
            mb: { xs: 2, md: 3 },
          }}
        >
          <MenuBook sx={{ fontSize: 40 }} />
        </Box>

        <Typography
          variant="h2"
          sx={{
            mb: { xs: 2, md: 3 },
            color: "text.primary",
            fontSize: { xs: "1.5rem", md: "1.75rem" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 1,
          }}
        >
          📖 Una Herramienta Espiritual Potenciada por IA
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.7,
            color: "text.secondary",
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          AI Sabbath+ es una aplicación diseñada para estudiantes y maestros de
          la Escuela Sabática. Ofrece una experiencia de estudio diaria con
          herramientas inteligentes que te ayudan a comprender, reflexionar y
          aplicar la Palabra de Dios en tu vida diaria.
        </Typography>
      </Paper>
    </Container>
  );
}
