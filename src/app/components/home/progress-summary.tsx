import React from "react";
import {
  Paper,
  Box,
  Typography,
  LinearProgress,
  Card,
  CardContent,
} from "@mui/material";
import {
  EmojiEvents,
  CalendarToday,
  TrackChanges,
  MenuBook,
} from "@mui/icons-material";

const stats = [
  {
    icon: CalendarToday,
    label: "Días esta semana",
    value: "3/7",
    progress: 43,
  },
  {
    icon: TrackChanges,
    label: "Lecciones completadas",
    value: "11/13",
    progress: 85,
  },
  {
    icon: MenuBook,
    label: "Reflexiones escritas",
    value: "8",
    progress: 100,
  },
];

export default function ProgressSummary() {
  return (
    <Paper elevation={2} sx={{ p: 3, mt: 2, borderRadius: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Box
          sx={{
            bgcolor: "#F39C12",
            color: "white",
            p: 1.5,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <EmojiEvents />
        </Box>
        <Box>
          <Typography variant="h3" color="text.primary">
            Tu Progreso
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Resumen de tu estudio
          </Typography>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        {stats.map((stat, index) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 1,
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <stat.icon sx={{ fontSize: 16, color: "primary.main" }} />
                <Typography
                  variant="body2"
                  sx={{ fontWeight: 500 }}
                  color="text.primary"
                >
                  {stat.label}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{ fontWeight: 600 }}
                color="text.primary"
              >
                {stat.value}
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={stat.progress}
              sx={{
                height: 6,
                borderRadius: 3,
                bgcolor: "rgba(44, 62, 80, 0.1)",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "primary.main",
                  borderRadius: 3,
                },
              }}
            />
          </Box>
        ))}
      </Box>

      <Card
        sx={{
          background: "linear-gradient(135deg, #F39C12 0%, #E67E22 100%)",
          color: "white",
        }}
      >
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
            <EmojiEvents sx={{ fontSize: 20 }} />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              ¡Excelente progreso!
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Estás en el 85% del trimestre. ¡Sigue así!
          </Typography>
        </CardContent>
      </Card>
    </Paper>
  );
}
