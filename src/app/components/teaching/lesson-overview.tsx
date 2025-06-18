/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { FC, memo } from "react";
import {
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  SxProps,
  Theme,
} from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { TeachingGuide } from "@/app/types/types";

// Theme colors & styles centralized
const INTRO_CARD_BG = "rgba(44, 62, 80, 0.05)";
const VERSE_CARD_BG = "rgba(52, 73, 94, 0.05)";
const VERSE_BORDER_COLOR = "#34495E";

// Props for the overview card
interface OverviewCardProps {
  title: string;
  icon?: React.ReactNode;
  bgColor: string;
  children: React.ReactNode;
  sx?: SxProps<Theme>;
}

// Reusable card component for sections
const OverviewCard: FC<OverviewCardProps> = memo(
  ({ title, icon, bgColor, children, sx }) => (
    <Card sx={{ bgcolor: bgColor, ...sx }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
          {icon}
          <Typography variant="h6" color="text.primary">
            {title}
          </Typography>
        </Box>
        {children}
      </CardContent>
    </Card>
  ),
);

// Props for the header
interface OverviewHeaderProps {
  title: string;
  icon: React.ReactNode;
}

// Header component for lesson overview
const OverviewHeader: FC<OverviewHeaderProps> = memo(({ title, icon }) => (
  <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        p: 1.5,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {icon}
    </Box>
    <Typography variant="h3" component="h2" color="text.primary">
      {title}
    </Typography>
  </Box>
));

interface LessonOverviewProps {
  teachingGuide: TeachingGuide;
}

// Main component
const LessonOverview: FC<LessonOverviewProps> = ({ teachingGuide }) => {
  // Guard for missing data
  if (!teachingGuide) {
    return (
      <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="body1" color="textSecondary">
          Información de la lección no disponible.
        </Typography>
      </Paper>
    );
  }

  const { intro, key_verse } = teachingGuide;

  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
      <OverviewHeader title="Resumen de la Lección" icon={<LightbulbIcon />} />

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
          gap: 3,
        }}
      >
        <OverviewCard
          title="Propósito de la Lección"
          bgColor={INTRO_CARD_BG}
          icon={<LightbulbIcon sx={{ color: "secondary.main" }} />}
        >
          <Typography
            variant="body1"
            sx={{ lineHeight: 1.7, color: "text.secondary" }}
          >
            {intro || "No hay propósito definido."}
          </Typography>
        </OverviewCard>

        <OverviewCard
          title="Versículo Clave"
          bgColor={VERSE_CARD_BG}
          icon={<MenuBookIcon sx={{ color: "secondary.main" }} />}
        >
          <Typography
            variant="body1"
            sx={{
              fontStyle: "italic",
              color: "text.primary",
              fontSize: "1.1rem",
              fontWeight: 500,
              textAlign: "center",
              p: 2,
              bgcolor: "rgba(255,255,255,0.7)",
              borderRadius: 2,
              border: `2px solid ${VERSE_BORDER_COLOR}`,
            }}
          >
            {key_verse || "No se ha definido un versículo clave."}
          </Typography>
        </OverviewCard>
      </Box>
    </Paper>
  );
};

export default memo(LessonOverview);
