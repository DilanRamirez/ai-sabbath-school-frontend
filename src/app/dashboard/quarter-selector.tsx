import React, { useMemo, KeyboardEvent } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Container,
} from "@mui/material";
import { Quarter } from "../types/types";

/**
 * Header component displaying the title and subtitle.
 */
const Header: React.FC = React.memo(() => (
  <Box sx={{ px: 3, py: 2 }}>
    <Typography variant="h3" fontWeight="bold" gutterBottom>
      Escuela Sabática
    </Typography>
    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
      Edición para adultos
    </Typography>
  </Box>
));
Header.displayName = "Header";

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
  if (!Array.isArray(quarters) || quarters.length === 0) {
    return <EmptyState />;
  }

  // Memoize rendered cards to avoid unnecessary recalculations
  const memoizedQuarterCards = useMemo(() => {
    return quarters.map((quarter) => (
      <Grid
        key={`${quarter.metadata.slug}-${quarter.year}`}
        sx={{ scrollSnapAlign: "start", minWidth: 220, px: 3 }}
      >
        <QuarterCard quarter={quarter} onSelect={onSelect} />
      </Grid>
    ));
  }, [quarters, onSelect]);

  return (
    <Container maxWidth="lg" sx={{ py: 0 }}>
      <Header />
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
        {memoizedQuarterCards}
      </Grid>
    </Container>
  );
};

export default React.memo(QuarterSelector);
