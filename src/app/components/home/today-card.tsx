"use client";
import React from "react";
import { CardContent, Box, Typography, Button, Card } from "@mui/material";
import { CalendarToday, AccessTime, ArrowForward } from "@mui/icons-material";
import { HomeLastPosition } from "@/app/types/types";
import { useRouter } from "next/navigation";

interface TodayHighlightProps {
  lastPosition: HomeLastPosition;
}

export default function TodayHighlight({ lastPosition }: TodayHighlightProps) {
  const router = useRouter();

  const { quarter, year, lesson_id, day } = lastPosition.position;
  const { title, memory_verse } = lastPosition.metadata;

  const handleClick = () => {
    router.push(`/home/${quarter}/${year}/lessons/${lesson_id}/${day}`);
  };

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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <CalendarToday sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {day}
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ mb: 2, color: "white" }}>
              {title}
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              {memory_verse.text}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTime sx={{ fontSize: 16 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {memory_verse.reference}
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
            <Button
              fullWidth={true}
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
              onClick={handleClick}
            >
              Estudiar Ahora
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
