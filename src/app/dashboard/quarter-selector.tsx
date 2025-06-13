/* eslint-disable react/prop-types */
import React, { useMemo, KeyboardEvent } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Paper,
} from "@mui/material";
import { Quarter } from "../types/types";

/**
 * Component shown when no quarters are available.
 */
const EmptyState: React.FC = React.memo(() => (
  <Box sx={{ px: 3, py: 4 }} role="status" aria-live="polite">
    <Typography variant="h6" color="text.secondary">
      No hay trimestres disponibles.
    </Typography>
  </Box>
));
EmptyState.displayName = "EmptyState";

interface QuarterSelectorProps {
  quarters: Quarter[];
  // eslint-disable-next-line no-unused-vars
  onSelect: (quarter: Quarter) => void;
}

/**
 * Individual quarter card component.
 */
const QuarterCard: React.FC<{
  quarter: Quarter;
  // eslint-disable-next-line no-unused-vars
  onSelect: (quarter: Quarter) => void;
}> = React.memo(({ quarter, onSelect }) => {
  const handleClick = () => onSelect(quarter);

  /**
   * Handle keyboard activation (Enter or Space).
   */
  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      onSelect(quarter);
    }
  };

  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={`Seleccionar trimestre ${quarter.metadata.displayName}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      sx={{
        cursor: "pointer",
        width: 200,
        height: "100%",
        transition: "box-shadow 0.3s",
        "&:hover, &:focus": {
          boxShadow: 6,
        },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={quarter.cover_url || undefined}
        alt={quarter.metadata.slug}
        loading="lazy"
      />
      <CardContent>
        <Typography variant="subtitle1" noWrap>
          {quarter.metadata.displayName}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {quarter.metadata.weekRange.start} – {quarter.metadata.weekRange.end}
        </Typography>
      </CardContent>
    </Card>
  );
});
QuarterCard.displayName = "QuarterCard";

/**
 * Selector component to choose from available quarters.
 */
const QuarterSelector: React.FC<QuarterSelectorProps> = ({
  quarters,
  onSelect,
}) => {
  // Memoize rendered cards to avoid unnecessary recalculations
  const memoizedQuarterCards = useMemo(() => {
    return Array.isArray(quarters) && quarters.length > 0
      ? quarters.map((quarter) => (
          <Grid
            key={`${quarter.metadata.slug}-${quarter.year}`}
            sx={{ scrollSnapAlign: "start", minWidth: 220, px: 3 }}
          >
            <QuarterCard quarter={quarter} onSelect={onSelect} />
          </Grid>
        ))
      : [];
  }, [quarters, onSelect]);

  if (memoizedQuarterCards.length === 0) {
    return <EmptyState />;
  }

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 3, mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h3" color="text.primary">
          Trimestres de Estudio
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: 3,
          },
        }}
      >
        {memoizedQuarterCards}
      </Box>
    </Paper>
  );
};

export default React.memo(QuarterSelector);
