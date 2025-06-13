/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React from "react";
import {
  Paper,
  Box,
  Typography,
  LinearProgress,
  Card,
  CardContent,
} from "@mui/material";
import { MenuBook } from "@mui/icons-material";

import { HomeLessonMetadata, HomeStudyProgress } from "@/app/types/types";

interface LessonPreviewHomeProps {
  lessonProgress: HomeStudyProgress | null;
  lessonMetadata?: HomeLessonMetadata;
}

/**
 * Displays an overview of the current lesson and memory verse progress.
 */
const LessonPreviewHome: React.FC<LessonPreviewHomeProps> = React.memo(
  ({ lessonProgress, lessonMetadata }) => {
    const completedDays = lessonProgress?.days_completed?.length ?? 0;
    const weeklyProgressPercent = Math.round((completedDays / 7) * 100);

    return (
      <Paper elevation={2} sx={{ p: { xs: 2, sm: 3 }, mt: 2, borderRadius: 3 }}>
        {/* Header with icon and metadata */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            mb: 3,
            gap: 2,
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
                minWidth: 48,
                minHeight: 48,
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
                {lessonMetadata?.title ?? "Título no disponible"} - Lección{" "}
                {lessonMetadata?.lesson_number ?? "N/D"}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Weekly progress display */}
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
              {completedDays}/7 días completados
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

        {/* Memory verse card */}
        <MemoryVerseCard lessonMetadata={lessonMetadata} />
      </Paper>
    );
  },
);

export default LessonPreviewHome;

/**
 * MemoryVerseCard
 * Displays the weekly memory verse.
 */
interface MemoryVerseCardProps {
  lessonMetadata: HomeLessonMetadata | undefined;
}
function MemoryVerseCard({ lessonMetadata }: MemoryVerseCardProps) {
  return (
    <Card
      role="region"
      aria-labelledby="memory-verse-title"
      sx={{ bgcolor: "rgba(44, 62, 80, 0.05)", mb: 0 }}
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
          {lessonMetadata?.memory_verse.text}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          - {lessonMetadata?.memory_verse.reference}
        </Typography>
      </CardContent>
    </Card>
  );
}
