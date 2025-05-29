import React from "react";
import { Grid, Card, CardContent, Typography } from "@mui/material";

const quarters = [
  { id: "q1", label: "1er Trimestre 2025" },
  { id: "q2", label: "2do Trimestre 2025" },
  { id: "q3", label: "3er Trimestre 2025" },
  { id: "q4", label: "4to Trimestre 2025" },
];

const QuarterSelector: React.FC = () => {
  return (
    <Grid container spacing={2}>
      {quarters.map((q) => (
        <Grid key={q.id}>
          <Card sx={{ cursor: "pointer" }}>
            <CardContent>
              <Typography>{q.label}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuarterSelector;
