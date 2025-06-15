import React from "react";
import { Container, Box } from "@mui/material";
import HeroSection from "@/app/components/welcome/hero-section";
import AboutSection from "@/app/components/welcome/about-section";
import FeaturesSection from "@/app/components/welcome/features-section";
import TrustSection from "@/app/components/welcome/trust-section";
import WelcomeHeader from "@/app/components/welcome/welcome-header";
import WelcomeFooter from "@/app/components/welcome/welcome-footer";

export default function WelcomePage() {
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <WelcomeHeader />
      <Container maxWidth="lg">
        <Box sx={{ py: 4 }}>
          <HeroSection />
          <AboutSection />
          <FeaturesSection />
          <TrustSection />
        </Box>
      </Container>
      <WelcomeFooter />
    </Box>
  );
}
