// src/app/lessons/page.tsx
"use client";

import React from "react";
import { Container, Typography } from "@mui/material";
import LessonsList from "@/app/components/lessons/lesson-list";
import { useAppSelector } from "@/app/store/hooks";

const LessonsPage = () => {
  const { lessons, loading, error } = useAppSelector((state) => state.lessons);
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {loading && <Typography>Cargando lecciones...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && <LessonsList lessons={lessons} />}
    </Container>
  );
};

export default LessonsPage;
