import React from "react";
import { Typography, Box, Chip } from "@mui/material";

interface WelcomeHeaderProps {
  name: string;
  role: "student" | "teacher";
}

const WelcomeHeader: React.FC<WelcomeHeaderProps> = ({ name, role }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Bienvenido, {name}
      </Typography>
      <Chip
        label={role === "teacher" ? "Maestro" : "Estudiante"}
        color="primary"
      />
    </Box>
  );
};

export default WelcomeHeader;
