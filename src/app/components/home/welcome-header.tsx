import React from "react";
import type { FC } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { User } from "@/app/types/types";

// Reusable styles for Box components to avoid repetition
const flexRowCenter = {
  display: "flex",
  alignItems: "center",
};

interface WelcomeHeaderProps {
  user: User;
}
const WelcomeHeader: FC<WelcomeHeaderProps> = ({ user }) => (
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
            &quot;Lámpara es a mis pies tu palabra, y lumbrera a mi camino&quot;
            - Salmo 119:105
          </Typography>
        </Box>
      </Box>
    </Box>
  </Paper>
);

export default WelcomeHeader;
