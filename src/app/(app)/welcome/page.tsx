import React from "react";
import { Container, Box } from "@mui/material";
import HeroSection from "@/app/components/welcome/hero-section";
import AboutSection from "@/app/components/welcome/about-section";
import FeaturesSection from "@/app/components/welcome/features-section";
import TrustSection from "@/app/components/welcome/trust-section";
import CallToActionSection from "@/app/components/welcome/call-to-action";

export default function WelcomePage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <TrustSection />
          <CallToActionSection />
        </Box>
      </Container>
    </Box>
  );
}
