// src/app/(app)/home/[quarterId]/lessons/[lessonId]/page.tsx
"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const days = [
  "Sábado",
  "Domingo",
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
];

export default function LessonOverviewPage() {
  const router = useRouter();
  const { quarterId, lessonId, year } = useParams();

  const handleClick = (day: string) => {
    router.push(`/home/${quarterId}/${year}/lessons/${lessonId}/${day}`);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="calc(90vh - 80px)"
    >
      <Typography variant="h4" gutterBottom>
        Días del Estudio
      </Typography>
      <Box maxWidth={360} width="100%">
        <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {days.map((day) => (
            <ListItemButton key={day} onClick={() => handleClick(day)}>
              <ListItemText
                primary={day.charAt(0).toUpperCase() + day.slice(1)}
                sx={{ textAlign: "center" }}
              />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Box>
  );
}
