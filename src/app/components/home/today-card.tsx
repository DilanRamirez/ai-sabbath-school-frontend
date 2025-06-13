import React from "react";
import { CardContent, Box, Typography, Button, Card } from "@mui/material";
import { CalendarToday, AccessTime, ArrowForward } from "@mui/icons-material";

export default function TodayHighlight() {
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
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ flex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
              <CalendarToday sx={{ fontSize: 20 }} />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Hoy, 13 de Junio
              </Typography>
            </Box>
            <Typography variant="h2" sx={{ mb: 2, color: "white" }}>
              Lección 11: La Ira de Dios
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Explora cómo la ira de Dios se revela contra toda impiedad
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <AccessTime sx={{ fontSize: 16 }} />
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                15-20 minutos de estudio
              </Typography>
            </Box>
          </Box>
          <Box sx={{ ml: 4 }}>
            <Button
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
            >
              Estudiar Ahora
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
