"use client";

import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import Link from "next/link";

export default function HomePage() {
  return (
    <Stack
      spacing={3}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh", textAlign: "center" }}
    >
      <Typography variant="h4" align="center">
        Bienvenido a Escuela Sabática Interactiva
      </Typography>
      <Typography variant="body1" align="center">
        Comienza tu jornada espiritual diaria con nosotros.
      </Typography>

      <Stack direction="row" spacing={2}>
        <Link href="/login" passHref>
          <Button variant="outlined" color="primary">
            Iniciar Sesión
          </Button>
        </Link>
        <Link href="/register" passHref>
          <Button variant="contained" color="primary">
            Registrarse
          </Button>
        </Link>
      </Stack>
    </Stack>
  );
}
