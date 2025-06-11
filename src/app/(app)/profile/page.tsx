"use client";

import React from "react";
import { Box, Typography, Paper, Stack } from "@mui/material";
import { useAppSelector } from "@/app/store/hooks";
import { useUserStudyData } from "@/app/hooks/use-user-data";

export default function ProfilePage() {
  const { user } = useAppSelector((state) => state.user);
  const {
    data: progressData,
    loading,
    error,
  } = useUserStudyData(user.email || "");

  if (loading) {
    return (
      <Box p={4}>
        <Typography variant="h5">Perfil</Typography>
        <Typography>Cargando progreso...</Typography>
      </Box>
    );
  }
  if (error) {
    return (
      <Box p={4}>
        <Typography variant="h5">Perfil</Typography>
        <Typography color="error">Error al cargar datos: {error}</Typography>
      </Box>
    );
  }
  if (!progressData || progressData.length === 0) {
    return (
      <Box p={4}>
        <Typography variant="h5">Perfil</Typography>
        <Typography>No hay datos de progreso disponibles.</Typography>
      </Box>
    );
  }

  // Flatten all notes from every progress entry
  const allNotes = progressData.flatMap((p) => p.notes);
  // Group notes by quarter and lesson_id
  const groupedNotes: Record<string, Record<string, any[]>> = allNotes.reduce(
    (acc, note) => {
      const quarter = note.quarter || "Unknown";
      const lessonId = note.lesson_id || "Unknown";
      if (!acc[quarter]) acc[quarter] = {};
      if (!acc[quarter][lessonId]) acc[quarter][lessonId] = [];
      acc[quarter][lessonId].push(note);
      return acc;
    },
    {} as Record<string, Record<string, any[]>>,
  );

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Perfil de {user?.name || "Usuario"}
      </Typography>

      {progressData.map((prog, idx) => (
        <Paper key={idx} variant="outlined" sx={{ p: 3, mb: 4 }}>
          <Typography variant="subtitle1">
            <strong>Lección:</strong> {prog.lesson_id}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Cohorte:</strong> {prog.cohort_id}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Último acceso:</strong>{" "}
            {new Date(prog.last_accessed).toLocaleString()}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Días completados:</strong>{" "}
            {prog.days_completed.join(", ") || "Ninguno"}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Puntaje:</strong> {prog.score}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Última posición:</strong>{" "}
            {`${prog.last_position?.quarter} > ${prog.last_position?.lesson_id} > ${prog.last_position?.day}`}
          </Typography>
        </Paper>
      ))}

      <Typography variant="h5" gutterBottom>
        Notas
      </Typography>
      {allNotes.length === 0 ? (
        <Typography>No hay notas registradas.</Typography>
      ) : (
        Object.entries(groupedNotes).map(([quarter, lessons]) => (
          <Box key={quarter} sx={{ mb: 3 }}>
            <Typography variant="h6">Quarter {quarter}</Typography>
            {Object.entries(lessons).map(([lessonId, notes]) => (
              <Box key={lessonId} sx={{ ml: 2, mb: 2 }}>
                <Typography variant="subtitle1">Lección {lessonId}</Typography>
                <Stack spacing={2}>
                  {notes.map((note, idx) => (
                    <Paper key={idx} sx={{ p: 2 }}>
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
              </Box>
            ))}
          </Box>
        ))
      )}
    </Box>
  );
}
