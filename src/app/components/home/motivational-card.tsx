import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import { FormatQuote, PlayArrow, OpenInNew } from "@mui/icons-material";

// Constants
const INSPIRATIONAL_QUOTE =
  "La oración es el aliento del alma. Es el secreto del poder espiritual. No puede ser sustituida por ningún otro medio de gracia.";
const QUOTE_AUTHOR = "Elena G. White";

// Styles
const cardWrapperStyles = {
  background: "linear-gradient(135deg, #34495E 0%, #2C3E50 100%)",
  color: "white",
  borderRadius: 3,
  boxShadow: 4,
  mt: 2,
};
const quoteIconBoxStyles = {
  bgcolor: "rgba(255,255,255,0.2)",
  p: 1.5,
  borderRadius: 2,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const quoteCardStyles = {
  bgcolor: "rgba(255,255,255,0.1)",
  mb: 3,
};
const missionVideoButtonStyles = {
  borderColor: "rgba(255,255,255,0.3)",
  color: "white",
  "&:hover": {
    borderColor: "rgba(255,255,255,0.5)",
    bgcolor: "rgba(255,255,255,0.1)",
  },
};

// Subcomponents
function InspirationalQuote() {
  return (
    <Card sx={quoteCardStyles}>
      <CardContent>
        <Typography
          variant="body2"
          sx={{ fontStyle: "italic", mb: 1, color: "white" }}
        >
          {INSPIRATIONAL_QUOTE}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7, color: "white" }}>
          - {QUOTE_AUTHOR}
        </Typography>
      </CardContent>
    </Card>
  );
}

function MissionVideoSection() {
  return (
    <Box sx={{ mb: 2 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
          Historia Misionera de Hoy
        </Typography>
        <IconButton size="small" sx={{ color: "white" }}>
          <OpenInNew fontSize="small" />
        </IconButton>
      </Box>

      <Button
        variant="outlined"
        fullWidth
        startIcon={<PlayArrow />}
        sx={missionVideoButtonStyles}
      >
        Ver video de la misión
      </Button>
    </Box>
  );
}

export default function DailyInspirationCard() {
  return (
    <Card sx={cardWrapperStyles}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "start", gap: 2, mb: 3 }}>
          <Box sx={quoteIconBoxStyles}>
            <FormatQuote />
          </Box>
          <Box>
            <Typography variant="h3" sx={{ color: "white" }}>
              Inspiración Diaria
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              Reflexión y misión
            </Typography>
          </Box>
        </Box>

        <InspirationalQuote />
        <MissionVideoSection />
      </CardContent>
    </Card>
  );
}
