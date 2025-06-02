"use client";
import React from "react";
import { Container, Typography } from "@mui/material";
import LessonsList from "@/app/components/lessons/lesson-list";
import { useLessonData } from "@/app/hooks/use-lesson-data";
import { useParams } from "next/navigation";

const LessonsPage = () => {
  const { lessons, loading, error } = useLessonData();

  const params = useParams();
  const quarterId =
    typeof params?.quarterId === "string" ? params.quarterId : "";
  const year = typeof params?.year === "string" ? params.year : "";

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {loading && <Typography>Cargando lecciones...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && (
        <LessonsList lessons={lessons} quarterId={quarterId} year={year} />
      )}
    </Container>
  );
};

export default LessonsPage;
