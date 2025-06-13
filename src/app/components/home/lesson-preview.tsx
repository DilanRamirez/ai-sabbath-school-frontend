import React from "react";
import {
  Paper,
  Box,
  Typography,
  Button,
  LinearProgress,
  Card,
  CardContent,
} from "@mui/material";
import { MenuBook, PlayArrow } from "@mui/icons-material";

/**
 * MemoryVerseCard
 * Displays the weekly memory verse.
 */
function MemoryVerseCard() {
  return (
    <Card
      role="region"
      aria-labelledby="memory-verse-title"
      sx={{ bgcolor: "rgba(44, 62, 80, 0.05)", mb: 3 }}
    >
      <CardContent>
        <Typography
          variant="h6"
          id="memory-verse-title"
          sx={{ mb: 2 }}
          color="text.primary"
        >
          Versículo para Memorizar
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", mb: 1 }}
          color="text.primary"
        >
          &quot;Porque la ira de Dios se revela desde el cielo contra toda
          impiedad e injusticia de los hombres&quot;
        </Typography>
        <Typography variant="body2" color="text.secondary">
          - Romanos 1:18
        </Typography>
      </CardContent>
    </Card>
  );
}

/**
 * LessonPreviewHome
 * Displays an overview of the current lesson progress and memory verse.
 */
export default function LessonPreviewHome() {
  const weeklyProgressPercent = 43;

  return (
    <Paper elevation={2} sx={{ p: 3, mt: 2, borderRadius: 3 }}>
      {/* Header section with icon and lesson info */}
      <Box
        sx={{
          display: "flex",
          alignItems: "start",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{
              bgcolor: "primary.main",
              color: "white",
              p: 1.5,
              borderRadius: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            aria-label="Lesson icon"
          >
            <MenuBook />
          </Box>
          <Box>
            <Typography variant="h3" color="text.primary">
              Lección en Progreso
            </Typography>
            <Typography variant="body1" color="text.secondary">
              El Libro de Apocalipsis - Semana 11
            </Typography>
          </Box>
        </Box>
        <Button variant="outlined" size="small">
          Ver Todo
        </Button>
      </Box>

      {/* Weekly progress section */}
      <Box sx={{ mb: 3 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{ fontWeight: 500 }}
            color="text.primary"
          >
            Progreso Semanal
          </Typography>
          <Typography variant="body2" color="text.secondary">
            3/7 días completados
          </Typography>
        </Box>
        <LinearProgress
          variant="determinate"
          value={weeklyProgressPercent}
          sx={{
            height: 8,
            borderRadius: 4,
            bgcolor: "rgba(44, 62, 80, 0.1)",
            "& .MuiLinearProgress-bar": {
              bgcolor: "primary.main",
              borderRadius: 4,
            },
          }}
        />
      </Box>

      {/* Memory verse */}
      <MemoryVerseCard />

      {/* Continue button */}
      <Button
        variant="contained"
        fullWidth
        startIcon={<PlayArrow />}
        size="large"
        sx={{ py: 1.5, fontWeight: 600 }}
        aria-label="Continue study"
      >
        Continuar donde te quedaste
      </Button>
    </Paper>
  );
}
