"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { useAppSelector } from "@/app/store/hooks";

interface StudyNote {
  day: string;
  note: string;
  question_id?: string;
  created_at?: string;
}

interface LastPosition {
  lesson_id: string;
  day: string;
  quarter: string;
}

interface StudyProgress {
  lesson_id: string;
  cohort_id: string;
  days_completed: string[];
  score: number;
  last_accessed: string;
  notes: StudyNote[];
  last_position: LastPosition;
}

export default function ProfilePage() {
  const [progress, setProgress] = useState<StudyProgress | null>(null);
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    try {
      // eslint-disable-next-line no-undef
      const raw = localStorage.getItem("studyProgress");
      if (raw) {
        const parsed = JSON.parse(raw);
        setProgress(parsed);
      }
    } catch (error) {
      console.error("Failed to load study progress from localStorage:", error);
    }
  }, []);

  if (!progress) {
    return (
      <Box p={4}>
        <Typography variant="h5">Perfil</Typography>
        <Typography>No hay datos de progreso disponibles.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Perfil de {user?.name || "Usuario"}
      </Typography>

      <Paper variant="outlined" sx={{ p: 3, mb: 4 }}>
        <Typography variant="subtitle1">
          <strong>Rol:</strong> {user.role}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Lección:</strong> {progress.lesson_id}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Cohorte:</strong> {progress.cohort_id}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Último acceso:</strong>{" "}
          {new Date(progress.last_accessed).toLocaleString()}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Progreso:</strong>{" "}
          {progress.days_completed.join(", ") || "Ninguno"}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Puntaje:</strong> {progress.score}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Última posición:</strong>{" "}
          {`${progress.last_position?.quarter || ""} > ${
            progress.last_position?.lesson_id
          } > ${progress.last_position?.day}`}
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom>
        Notas
      </Typography>
      {progress.notes.length === 0 ? (
        <Typography>No hay notas registradas.</Typography>
      ) : (
        <Stack spacing={2}>
          {progress.notes.map((note, index) => (
            <Paper key={index} sx={{ p: 2 }}>
              <Typography variant="subtitle2">
                <strong>Día:</strong> {note.day}
              </Typography>
              {note.question_id && (
                <Typography variant="caption" color="text.secondary">
                  Pregunta: {note.question_id}
                </Typography>
              )}
              <Typography sx={{ mt: 1 }}>{note.note}</Typography>
              {note.created_at && (
                <Typography variant="caption" color="text.secondary">
                  Fecha: {new Date(note.created_at).toLocaleString()}
                </Typography>
              )}
            </Paper>
          ))}
        </Stack>
      )}
    </Box>
  );
}
