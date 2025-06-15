import React from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import {
  Psychology,
  FavoriteBorder,
  Edit,
  Group,
  TrendingUp,
  Search,
} from "@mui/icons-material";

const features = [
  {
    icon: Psychology,
    title: "🧠 Explicación Bíblica con IA",
    description:
      "Aclara pasajes difíciles con respuestas claras y centradas en la Biblia.",
    color: "#3498DB",
  },
  {
    icon: FavoriteBorder,
    title: "🙏 Reflexiones Espirituales Personalizadas",
    description:
      "Recibe pensamientos que conectan la lección con tu vida diaria.",
    color: "#E74C3C",
  },
  {
    icon: Edit,
    title: "📝 Anota y Guarda tus Respuestas",
    description: "Escribe tus respuestas y reflexiones en cada día de estudio.",
    color: "#F39C12",
  },
  {
    icon: TrendingUp,
    title: "📊 Seguimiento de Progreso",
    description:
      "Marca los días estudiados, revisa tu avance y visualiza tu crecimiento.",
    color: "#9B59B6",
  },
  {
    icon: Search,
    title: "🔍 Búsqueda Semántica Avanzada",
    description:
      "Encuentra respuestas dentro del contenido bíblico y de la lección, con IA.",
    color: "#1ABC9C",
  },
  {
    icon: Group,
    title: "👥 Estudia en Grupos (Proximamente)",
    description:
      "Únete o lidera grupos de estudio para compartir progreso y comentarios.",
    color: "#27AE60",
  },
];

export default function FeaturesSection() {
  return (
    <Container
      id="funciones"
      maxWidth="lg"
      sx={{ mb: { xs: 6, md: 8 }, px: { xs: 2, sm: 3 } }}
    >
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h2"
          sx={{
            mb: { xs: 3, md: 2 },
            color: "text.primary",
            fontSize: { xs: "1.5rem", md: "1.75rem" },
            px: { xs: 1, sm: 0 },
          }}
        >
          ⚙️ ¿Qué Puedes Hacer con Intelligent Sabbath+?
        </Typography>
      </Box>

      <Grid
        container
        spacing={{ xs: 3, md: 4, lg: 5 }}
        justifyContent="center"
        alignItems="stretch"
      >
        {features.map((feature, index) => (
          <Grid key={index}>
            <Card
              sx={{
                height: "100%",
                width: 300,
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: 6,
                },
                border: `2px solid ${feature.color}20`,
              }}
            >
              <CardContent sx={{ p: { xs: 2.5, md: 3 }, textAlign: "center" }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: feature.color,
                    color: "white",
                    borderRadius: "50%",
                    width: { xs: 50, md: 60 },
                    height: { xs: 50, md: 60 },
                    mb: { xs: 1.5, md: 2 },
                  }}
                >
                  <feature.icon sx={{ fontSize: 30 }} />
                </Box>

                <Typography
                  variant="h6"
                  sx={{
                    mb: { xs: 1.5, md: 2 },
                    fontWeight: 600,
                    color: "text.primary",
                    fontSize: { xs: "1rem", md: "1.1rem" },
                  }}
                >
                  {feature.title}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{
                    color: "text.secondary",
                    lineHeight: 1.6,
                    fontSize: { xs: "0.85rem", md: "0.875rem" },
                  }}
                >
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
