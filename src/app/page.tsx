"use client";

import React from "react";
import { Button, Container, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";

export default function StarterPage() {
  const router = useRouter();

  return (
    <Container
      maxWidth="xs"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack spacing={4} alignItems="center" width="100%">
        <Typography variant="h5" fontWeight="bold" align="center">
          Welcome to Sabbath School
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          Start your journey through the Bible — one day, one lesson, one
          spiritual insight at a time — with the help of AI to guide your
          understanding and deepen your study.
        </Typography>

        <Stack
          spacing={{ xs: 2, md: 0 }}
          direction={{ xs: "column", md: "row" }}
          width="100%"
          justifyContent="space-between"
          gap={{ xs: 0, md: 3 }}
        >
          <Button
            variant="contained"
            fullWidth={true}
            sx={{ maxWidth: { md: 200 } }}
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            fullWidth={true}
            sx={{ maxWidth: { md: 200 } }}
            onClick={() => router.push("/register")}
          >
            Create Account
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
}
