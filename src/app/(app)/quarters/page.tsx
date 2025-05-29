import React from "react";
import { Box, Container } from "@mui/material";
import WelcomeHeader from "@/app/dashboard/welcome-header";
import QuarterSelector from "@/app/dashboard/quarter-selector";
import LessonPreview from "@/app/dashboard/lesson-preview";
import QuickActions from "@/app/dashboard/quick-actions";

const Quarters = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <WelcomeHeader name="Dilan" role="student" />
      <Box sx={{ mt: 4 }}>
        <QuarterSelector />
      </Box>
      <Box sx={{ mt: 6 }}>
        <LessonPreview />
      </Box>
      <Box sx={{ mt: 6 }}>
        <QuickActions />
      </Box>
    </Container>
  );
};

export default Quarters;
