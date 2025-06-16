import React from "react";
import type { FC } from "react";
import { Paper, Box, Typography, Button } from "@mui/material";
import { User } from "@/app/types/types";
import { Download } from "@mui/icons-material";
import { useRouter } from "next/navigation";

// Reusable styles for Box components to avoid repetition
const flexRowCenter = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
};

interface WelcomeHeaderProps {
  user: User;
}
const WelcomeHeader: FC<WelcomeHeaderProps> = ({ user }) => {
  const router = useRouter();

  return (
    <Paper
      elevation={1}
      sx={{
        p: 3,
        borderRadius: 3,
      }}
    >
      <Box
        sx={{
          ...flexRowCenter,
          justifyContent: "space-between",
        }}
      >
        {/* User Info */}
        <Box sx={{ ...flexRowCenter, gap: 2 }}>
          <Box>
            <Typography variant="h2" color="text.primary">
              ¡Bienvenido, {user.name}!
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
              Que tu estudio sea guiado por el Espíritu Santo
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mt: 1,
                fontStyle: "italic",
                color: "primary.main",
              }}
            >
              &quot;Lámpara es a mis pies tu palabra, y lumbrera a mi
              camino&quot; - Salmo 119:105
            </Typography>
          </Box>
          {/* Action Button with proper ARIA label for accessibility */}
          <Button
            variant="contained"
            size="large"
            endIcon={<Download />}
            sx={{
              bgcolor: "#2C3E50",
              color: "#fff",
              fontWeight: 600,
              px: 3,
              py: 1.5,
            }}
            onClick={() => router.push(`/report`)}
            aria-label="Estudiar Ahora"
          >
            Reporte
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

export default WelcomeHeader;
