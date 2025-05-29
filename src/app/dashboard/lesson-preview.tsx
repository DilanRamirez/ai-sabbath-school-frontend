import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const LessonPreview: React.FC = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">Tu lección de esta semana</Typography>
        <Typography variant="body2">En los Salmos - Parte 1</Typography>
        <Typography variant="body2" color="text.secondary">
          17 - 23 Mayo
        </Typography>
      </CardContent>
    </Card>
  );
};

export default LessonPreview;
