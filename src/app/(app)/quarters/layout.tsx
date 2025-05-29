// app/(auth)/layout.tsx
import React, { ReactNode } from "react";
import { Box, Container, Typography } from "@mui/material";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Escuela Sabática Interactiva
      </Typography>
      <Box sx={{ mt: 2 }}>{children}</Box>
    </Container>
  );
}
