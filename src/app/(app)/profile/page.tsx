/* eslint-disable react/prop-types */

"use client";

import React, { useMemo } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { useAppSelector } from "@/app/store/hooks";
import { useUserStudyData } from "@/app/hooks/use-user-data";
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface Note {
  quarter: string;
  lesson_id: string;
  day: string;
  note: string;
  content?: string;
  question_id?: string;
  created_at?: string;
}

interface ProgressEntry {
  lesson_id: string;
  cohort_id: string;
  last_accessed: string;
  days_completed: string[];
  score: number;
  last_position?: {
    quarter: string;
    lesson_id: string;
    day: string;
  };
  notes: Note[];
}

/**
 * Groups notes by quarter and lesson ID.
 */
function groupNotesByQuarterAndLesson(
  notes: Note[],
): Record<string, Record<string, Note[]>> {
  return notes.reduce(
    (groups, note) => {
      const quarterKey = note.quarter || "Unknown";
      const lessonKey = note.lesson_id || "Unknown";
      if (!groups[quarterKey]) groups[quarterKey] = {};
      if (!groups[quarterKey][lessonKey]) groups[quarterKey][lessonKey] = [];
      groups[quarterKey][lessonKey].push(note);
      return groups;
    },
    {} as Record<string, Record<string, Note[]>>,
  );
}

// Loading indicator component
const LoadingView: React.FC = () => (
  <Box p={4} role="status" aria-live="polite">
    <Typography variant="h5">Perfil</Typography>
    <Typography>Cargando progreso...</Typography>
  </Box>
);

// Error view component
const ErrorView: React.FC<{ message: string }> = ({ message }) => (
  <Box p={4} role="alert">
    <Typography variant="h5">Perfil</Typography>
    <Typography color="error">Error al cargar datos: {message}</Typography>
  </Box>
);

// Empty progress view component
const EmptyProgressView: React.FC = () => (
  <Box p={4}>
    <Typography variant="h5">Perfil</Typography>
    <Typography>No hay datos de progreso disponibles.</Typography>
  </Box>
);

// Progress entry card
const ProgressCard: React.FC<{ entry: ProgressEntry }> = React.memo(
  ({ entry }) => (
    <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
      <Typography variant="subtitle1">
        <strong>Lección:</strong> {entry.lesson_id}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Cohorte:</strong> {entry.cohort_id}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Último acceso:</strong>{" "}
        {new Date(entry.last_accessed).toLocaleString()}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Días completados:</strong>{" "}
        {entry.days_completed.length > 0
          ? entry.days_completed.join(", ")
          : "Ninguno"}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Puntaje:</strong> {entry.score}
      </Typography>
      <Typography variant="subtitle1">
        <strong>Última posición:</strong>{" "}
        {entry.last_position
          ? `${entry.last_position.quarter} > ${entry.last_position.lesson_id} > ${entry.last_position.day}`
          : "N/A"}
      </Typography>
    </Paper>
  ),
);
ProgressCard.displayName = "ProgressCard";

// Notes section component
const NotesSection: React.FC<{
  grouped: Record<string, Record<string, Note[]>>;
  totalNotes: number;
}> = ({ grouped, totalNotes }) => {
  if (totalNotes === 0) {
    return <Typography>No hay notas registradas.</Typography>;
  }
  return (
    <>
      {Object.entries(grouped).map(([quarter, lessons]) => (
        <Box
          key={quarter}
          sx={{ mb: 3 }}
          role="region"
          aria-label={`Notas trimestre ${quarter}`}
        >
          <Typography variant="h6" gutterBottom>
            Trimestre: {quarter.replace(/-/g, " ")}
          </Typography>
          {Object.entries(lessons).map(([lessonId, notes]) => (
            <Accordion key={lessonId} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${lessonId}-content`}
                id={`panel-${lessonId}-header`}
              >
                <Typography variant="subtitle1">Lección {lessonId}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Stack spacing={2}>
                  {notes.map((note, idx) => (
                    <Paper
                      key={`${lessonId}-${note.created_at}-${idx}`}
                      sx={{ p: 2 }}
                    >
                      <Typography variant="subtitle2">
                        <strong>Día:</strong> {note.day}
                      </Typography>
                      {note.question_id && (
                        <Typography variant="subtitle2">
                          Pregunta: {note.content}
                        </Typography>
                      )}
                      <Typography sx={{ mt: 1 }}>
                        Respuesta: {note.note}
                      </Typography>
                      {note.created_at && (
                        <Typography variant="caption" color="text.secondary">
                          Fecha: {new Date(note.created_at).toLocaleString()}
                        </Typography>
                      )}
                    </Paper>
                  ))}
                </Stack>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
      ))}
    </>
  );
};

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.user);
  const email = user?.email || "";
  const { data: progressData, loading, error } = useUserStudyData(email);

  // Memoized extraction and grouping of notes with a default for progressData
  const allNotes = useMemo(
    () => (progressData || []).flatMap((p) => p.notes || []),
    [progressData],
  );
  const groupedNotes = useMemo(
    () => groupNotesByQuarterAndLesson(allNotes),
    [allNotes],
  );

  // Guard for missing email
  if (!user?.email) {
    return (
      <Box p={4}>
        <Typography variant="h5">Perfil</Typography>
        <Typography color="text.secondary">Usuario no autenticado.</Typography>
      </Box>
    );
  }

  if (loading) return <LoadingView />;
  if (error) return <ErrorView message={error} />;
  if (!progressData || progressData.length === 0) return <EmptyProgressView />;

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Perfil de {user.name || "Usuario"}
      </Typography>
      {progressData.map((entry) => (
        <ProgressCard key={entry.lesson_id} entry={entry} />
      ))}
      <Typography variant="h5" gutterBottom>
        Notas ({allNotes.length})
      </Typography>
      <NotesSection grouped={groupedNotes} totalNotes={allNotes.length} />
    </Box>
  );
}
