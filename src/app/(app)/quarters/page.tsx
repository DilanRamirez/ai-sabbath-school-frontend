"use client";
import React, { useState } from "react";
import { Box, Container } from "@mui/material";
import QuarterSelector from "@/app/dashboard/quarter-selector";
import { useLessonData } from "@/app/hooks/use-lesson-data";
import { Quarter } from "@/app/types/types";

const Quarters = () => {
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter | undefined>(
    undefined,
  );
  const { quarters } = useLessonData(selectedQuarter);

  const handleQuarterSelect = (quarter: Quarter) => {
    setSelectedQuarter(quarter);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 0 }}>
      <Box sx={{ mt: 4 }}>
        <QuarterSelector quarters={quarters} onSelect={handleQuarterSelect} />
      </Box>
    </Container>
  );
};

export default Quarters;
