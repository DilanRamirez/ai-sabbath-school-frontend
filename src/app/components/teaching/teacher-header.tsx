import React from "react";
import { Box, Typography, Breadcrumbs, Link, Chip, Paper } from "@mui/material";
import { School, Home, NavigateNext, CalendarToday } from "@mui/icons-material";

interface TeacherHeaderProps {
  lessonData: {
    lesson_title: string;
    date: string;
  };
}

export default function TeacherHeader({ lessonData }: TeacherHeaderProps) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        borderRadius: 3,
        background: "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)",
        color: "white",
        mb: 2,
      }}
    >
      <Breadcrumbs
        separator={<NavigateNext fontSize="small" />}
        sx={{ mb: 3, color: "rgba(255,255,255,0.8)" }}
      >
        <Link
          underline="hover"
          color="inherit"
          href="/"
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <Home fontSize="small" />
          Inicio
        </Link>
        <Typography
          color="white"
          sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
        >
          <School fontSize="small" />
          Guía del Maestro
        </Typography>
      </Breadcrumbs>

      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box sx={{ flex: 1 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <Box
              sx={{
                bgcolor: "rgba(255,255,255,0.2)",
                p: 1.5,
                borderRadius: 2,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <School sx={{ fontSize: 32 }} />
            </Box>
            <Box>
              <Typography
                variant="h1"
                sx={{ fontSize: { xs: "1.75rem", md: "2rem" }, mb: 0.5 }}
              >
                Guía del Maestro
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Herramientas y recursos para una enseñanza efectiva
              </Typography>
            </Box>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" }, mb: 1 }}
            >
              {lessonData.lesson_title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                flexWrap: "wrap",
              }}
            >
              <Chip
                icon={<CalendarToday />}
                label={lessonData.date}
                sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "white" }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
}
