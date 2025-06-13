/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { memo, useMemo, useCallback } from "react";
import { CardContent, Box, Typography, Button, Card } from "@mui/material";
import { CalendarToday, AccessTime, ArrowForward } from "@mui/icons-material";
import { HomeLastPosition } from "@/app/types/types";
import { useRouter } from "next/navigation";

// Props interface with clear naming.
export interface TodayCardProps {
  lastPosition: HomeLastPosition;
}

/**
 * TodayCard Component
 *
 * Displays a card with summary information and a button to navigate to a detailed view.
 * Input is validated and recalculations are minimized via memoization.
 */
const TodayCard: React.FC<TodayCardProps> = ({ lastPosition }) => {
  const router = useRouter();

  // Guard clause for input validation to catch missing or invalid data.
  if (
    !lastPosition ||
    !lastPosition.position ||
    !lastPosition.metadata ||
    !lastPosition.position.quarter ||
    !lastPosition.position.year ||
    !lastPosition.position.lesson_id ||
    !lastPosition.position.day ||
    !lastPosition.metadata.title
  ) {
    return (
      <Card
        sx={{
          background: "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)",
          color: "white",
          borderRadius: 3,
          boxShadow: 6,
          mt: 2,
        }}
      >
        <CardContent sx={{ p: 4 }}>
          <Typography variant="body1" role="alert">
            Error: Datos inválidos proporcionados.
          </Typography>
        </CardContent>
      </Card>
    );
  }

  // Destructure properties for clarity.
  const { quarter, year, lesson_id, day } = lastPosition.position;
  const { title } = lastPosition.metadata;

  // Compute a memoized study summary to avoid unnecessary recalculations.
  const studySummary = useMemo(() => {
    if (lastPosition.aiSummaryDay?.summary) {
      const words = lastPosition.aiSummaryDay.summary.split(/\s+/);
      return words.slice(0, 50).join(" ");
    }
    return "";
  }, [lastPosition.aiSummaryDay]);

  // Navigation handler wrapped in useCallback to prevent re-creation.
  const handleNavigate = useCallback(() => {
    try {
      router.push(`/home/${quarter}/${year}/lessons/${lesson_id}/${day}`);
    } catch (error) {
      console.error("Navigation error:", error);
      // Optionally, trigger a UI error notification here.
    }
  }, [router, quarter, year, lesson_id, day]);

  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)",
        color: "white",
        borderRadius: 3,
        boxShadow: 6,
        mt: 2,
      }}
    >
      <CardContent sx={{ p: 4 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "stretch", sm: "center" },
            justifyContent: "space-between",
            gap: { xs: 3, sm: 0 },
          }}
        >
          <Box sx={{ flex: 1 }}>
            {/* Header: Day information with calendar icon */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <CalendarToday sx={{ fontSize: 20 }} aria-hidden="true" />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {day}
              </Typography>
            </Box>
            {/* Title */}
            <Typography variant="h2" sx={{ mb: 2, color: "white" }}>
              {title}
            </Typography>
            {/* Summary with fallback text */}
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              {studySummary
                ? `${studySummary} ...`
                : "Hoy es un buen día para estudiar. ¡Vamos a aprender algo nuevo!"}
            </Typography>
            {/* Study duration display */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTime sx={{ fontSize: 16 }} aria-hidden="true" />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                15-20 minutos de estudio
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              ml: { sm: 4 },
              alignSelf: { xs: "stretch", sm: "center" },
              textAlign: { xs: "center", sm: "right" },
            }}
          >
            {/* Action Button with proper ARIA label for accessibility */}
            <Button
              fullWidth
              variant="contained"
              size="large"
              endIcon={<ArrowForward />}
              sx={{
                bgcolor: "white",
                color: "primary.main",
                fontWeight: 600,
                px: 3,
                py: 1.5,
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.9)",
                },
              }}
              onClick={handleNavigate}
              aria-label="Estudiar Ahora"
            >
              Estudiar Ahora
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default memo(TodayCard);
