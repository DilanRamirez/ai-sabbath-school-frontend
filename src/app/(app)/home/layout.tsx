import React from "react";
import { Container, CssBaseline, Box } from "@mui/material";
import Header from "@/app/components/layout/header";
import Footer from "@/app/components/layout/footer";

export default function QuarterLayout({
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
          height: "calc(100vh - 120px)",
          overflow: "hidden",
          py: 0,
          backgroundColor: "#F9F9F9",
        }}
      >
        <Container maxWidth="lg">{children}</Container>
      </Box>
      <Footer />
    </>
  );
}
