import React from "react";
import { Container, CssBaseline, Box } from "@mui/material";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CssBaseline />
      <Header />
      <Box
        component="main"
        sx={{
          flex: 1,
          minHeight: "calc(100vh - 120px)",
          py: 4,
          backgroundColor: "#F9F9F9",
        }}
      >
        <Container maxWidth="sm">{children}</Container>
      </Box>
      <Footer />
    </>
  );
}
