"use client";

import React, { useMemo } from "react";
import { Container, Typography, Box } from "@mui/material";
import LessonsList from "@/app/components/lessons/lesson-list";
import { useLessonData } from "@/app/hooks/use-lesson-data";
import { useParams } from "next/navigation";

/**
 * Lessons page component.
 * Fetches lessons based on URL params and displays loading, error, empty, or content states.
 */
export default function LessonsPage() {
  const params = useParams();
  const quarterId =
    typeof params?.quarterId === "string" ? params.quarterId : "";
  const year = typeof params?.year === "string" ? params.year : "";
  const { lessons, loading, error } = useLessonData();
  const renderedLessons = useMemo(
    () => <LessonsList lessons={lessons} quarterId={quarterId} year={year} />,
    [lessons, quarterId, year]
  );

  // Validate URL parameters
  if (!quarterId || !year) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography color="error">Parámetros de URL inválidos.</Typography>
      </Container>
    );
  }

  // Loading state UI
  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography role="status">Cargando lecciones...</Typography>
      </Container>
    );
  }

  // Error state UI
  if (error) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography role="alert" color="error">
          Error al cargar lecciones: {error}
        </Typography>
      </Container>
    );
  }

  // Empty state UI
  if (!Array.isArray(lessons) || lessons.length === 0) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Typography>No hay lecciones disponibles</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box role="region" aria-label="Lista de lecciones">
        {renderedLessons}
      </Box>
    </Container>
  );
}
