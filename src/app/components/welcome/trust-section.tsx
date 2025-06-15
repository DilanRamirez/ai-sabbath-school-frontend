import React from "react";
import { Box, Typography, Paper, Container } from "@mui/material";
import { Lightbulb, VerifiedUser } from "@mui/icons-material";

export default function TrustSection() {
  return (
    <Container
      id="confianza"
      maxWidth="lg"
      sx={{ mb: { xs: 6, md: 8 }, px: { xs: 2, sm: 3 } }}
    >
      <Paper
        elevation={3}
        sx={{
          p: { xs: 4, md: 6 },
          borderRadius: { xs: 3, md: 4 },
          background: "linear-gradient(135deg, #E8F5E8 0%, #F0F8F0 100%)",
          border: "2px solid #27AE60",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "#27AE60",
              color: "white",
              borderRadius: "50%",
              width: { xs: 60, md: 70 },
              height: { xs: 60, md: 70 },
              mr: { xs: 1.5, md: 2 },
            }}
          >
            <Lightbulb sx={{ fontSize: 35 }} />
          </Box>
          <VerifiedUser sx={{ fontSize: 35, color: "#27AE60" }} />
        </Box>

        <Typography
          variant="h2"
          sx={{
            mb: { xs: 2, md: 3 },
            textAlign: "center",
            color: "#27AE60",
            fontWeight: 700,
            fontSize: { xs: "1.5rem", md: "1.75rem" },
          }}
        >
          💡 Siempre Centrado en la Biblia
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: { xs: "1rem", md: "1.1rem" },
            lineHeight: 1.7,
            color: "text.primary",
            textAlign: "center",
            maxWidth: "600px",
            mx: "auto",
          }}
        >
          Aunque usamos inteligencia artificial para ayudarte a estudiar, AI
          Intelligent Sabbath+ nunca reemplaza el estudio personal de la Biblia.
          Todo lo que ves es un recurso para profundizar tu comunión con Dios,
          no una fuente doctrinal definitiva.{" "}
          <Box component="span" sx={{ fontWeight: 600, color: "#27AE60" }}>
            Siempre verifica con la Palabra.
          </Box>
        </Typography>
      </Paper>
    </Container>
  );
}
