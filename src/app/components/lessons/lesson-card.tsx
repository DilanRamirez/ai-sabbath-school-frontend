// src/components/lessons/LessonCard.tsx
import React from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { LessonsResponse } from "@/app/types/types";

interface Props {
  lesson: LessonsResponse;
}

const LessonCard: React.FC<Props> = ({ lesson }) => {
  return (
    <Card sx={{ height: "100%", cursor: "pointer" }}>
      <CardContent>
        <Typography variant="h6">{lesson.lesson_id}</Typography>
      </CardContent>
    </Card>
  );
};

export default LessonCard;
