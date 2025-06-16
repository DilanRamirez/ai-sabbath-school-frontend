/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useState, useEffect, useMemo } from "react";
import {
  Paper,
  Box,
  Typography,
  LinearProgress,
  Card,
  CardContent,
} from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  CircularProgress,
} from "@mui/material";
import { Download, MenuBook } from "@mui/icons-material";
import ReactMarkdown from "react-markdown";

import { HomeLessonMetadata, HomeStudyProgress, User } from "@/app/types/types";
import { useReport } from "@/app/hooks/use-report";
import { downloadMarkdownAsPdf } from "@/app/lib/utils";

interface LessonPreviewHomeProps {
  lessonProgress: HomeStudyProgress | null;
  user: User;
  lessonMetadata?: HomeLessonMetadata;
}

/**
 * LessonPreviewHome component displays lesson progress and memory verse.
 */
const LessonPreviewHome: React.FC<LessonPreviewHomeProps> = React.memo(
  ({ lessonProgress, lessonMetadata, user }) => {
    const completedDays = useMemo(
      () => lessonProgress?.days_completed?.length ?? 0,
      [lessonProgress?.days_completed],
    );

    const weeklyProgressPercent = useMemo(
      () => Math.round((completedDays / 7) * 100),
      [completedDays],
    );

    const [modalOpen, setModalOpen] = useState(false);
    const { loading, error, mappedDays, refetch } = useReport(
      lessonProgress?.last_position,
      user,
    );

    useEffect(() => {
      if (!loading && mappedDays) {
        setModalOpen(true);
      }
    }, [loading, mappedDays]);

    return (
      <Paper elevation={2} sx={{ p: { xs: 4, sm: 4 }, mt: 2, borderRadius: 3 }}>
        <Box sx={{ flex: 1 }}></Box>
        {/* Lesson Header */}
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

        {/* Weekly Progress */}
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

        {/* Memory Verse */}
        <LessonMemoryVerse metadata={lessonMetadata} />
        <Box
          sx={{
            ml: { sm: 4 },
            alignSelf: { xs: "stretch", sm: "center" },
            textAlign: { xs: "center", sm: "center" },
          }}
        >
          {/* Action Button with proper ARIA label for accessibility */}
          <Button
            fullWidth
            variant="contained"
            size="large"
            endIcon={<Download />}
            sx={{
              bgcolor: "#2C3E50",
              color: "#fff",
              fontWeight: 600,
              px: 3,
              py: 1.5,
              mt: 2,
              "&:hover": {
                bgcolor: "#2C3E50",
              },
            }}
            onClick={() => {
              setModalOpen(false);
              refetch();
            }}
            aria-label="Estudiar Ahora"
          >
            Reporte de Lección
          </Button>
        </Box>
        <Dialog
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Reporte de la Lección</DialogTitle>
          <DialogContent dividers>
            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Typography color="error" sx={{ p: 2 }}>
                {error}
              </Typography>
            ) : mappedDays ? (
              <Box
                component="pre"
                sx={{ whiteSpace: "pre-wrap", fontSize: 14 }}
              >
                <ReactMarkdown
                  components={{
                    h1: ({ node, ...props }) => (
                      <Typography variant="h4" gutterBottom {...props} />
                    ),
                    h2: ({ node, ...props }) => (
                      <Typography variant="h5" gutterBottom {...props} />
                    ),
                    h3: ({ node, ...props }) => (
                      <Typography variant="h6" gutterBottom {...props} />
                    ),
                    // You can add more heading levels if needed
                  }}
                >
                  {mappedDays}
                </ReactMarkdown>
              </Box>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button
              variant="outlined"
              onClick={() => {
                // Generate markdown and download as PDF
                downloadMarkdownAsPdf(
                  mappedDays,
                  `Reporte_Leccion_${lessonMetadata?.lesson_number || "N"}.pdf`,
                );
              }}
            >
              Descargar PDF
            </Button>
            <Button onClick={() => setModalOpen(false)}>Cerrar</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    );
  },
);

export default LessonPreviewHome;

/**
 * LessonMemoryVerse
 * Shows the memory verse from metadata.
 */
interface LessonMemoryVerseProps {
  metadata?: HomeLessonMetadata;
}
const LessonMemoryVerse: React.FC<LessonMemoryVerseProps> = ({ metadata }) => {
  const verseText = metadata?.memory_verse?.text ?? "Versículo no disponible.";
  const verseRef = metadata?.memory_verse?.reference ?? "";

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
          sx={{ mb: 1 }}
          color="text.primary"
        >
          Versículo para Memorizar
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontStyle: "italic", mb: 1 }}
          color="text.primary"
        >
          {verseText}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          - {verseRef}
        </Typography>
      </CardContent>
    </Card>
  );
};
