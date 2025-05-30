import React from "react";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { Quarter } from "../types/types";

interface QuarterSelectorProps {
  quarters: Quarter[];
  // eslint-disable-next-line no-unused-vars
  onSelect: (quarter: Quarter) => void;
}

const QuarterSelector: React.FC<QuarterSelectorProps> = ({
  quarters,
  onSelect,
}) => {
  console.log("Rendering QuarterSelector with quarters:", quarters);
  return (
    <Grid container spacing={2}>
      {quarters.map((q) => (
        <Grid key={q.year}>
          <Card
            sx={{
              cursor: "pointer",
              width: "100%",
              maxWidth: { xs: 250, sm: 250, md: 250 },
              margin: "auto",
              transition: "box-shadow 0.3s",
              "&:hover": {
                boxShadow: 6, // Increase elevation on hover
              },
            }}
            onClick={() => onSelect(q)}
          >
            <CardMedia
              component="img"
              height="140"
              image={q.cover_url ?? ""}
              alt={q.metadata.slug}
            />
            <CardContent>
              <Typography>{q.metadata.displayName}</Typography>
              <Typography sx={{ mt: 2 }} variant="body2" color="text.secondary">
                {q.metadata.weekRange.start} - {q.metadata.weekRange.end}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuarterSelector;
