import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";
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
  return (
    <Box sx={{ px: 3 }}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Escuela Sabática
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Edición para adultos
      </Typography>

      <Grid
        container
        spacing={2}
        wrap="nowrap"
        sx={{
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {quarters.map((q) => (
          <Grid
            key={q.year}
            sx={{ scrollSnapAlign: "start", minWidth: 220, py: 1 }}
          >
            <Card
              sx={{
                cursor: "pointer",
                width: 200,
                height: "100%",
                transition: "box-shadow 0.3s",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
              onClick={() => onSelect(q)}
            >
              <CardMedia
                component="img"
                height="160"
                image={q.cover_url ?? ""}
                alt={q.metadata.slug}
              />
              <CardContent>
                <Typography variant="subtitle1" noWrap>
                  {q.metadata.displayName}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {q.metadata.weekRange.start} – {q.metadata.weekRange.end}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default QuarterSelector;
