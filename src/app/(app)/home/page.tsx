"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Container } from "@mui/material";
import QuarterSelector from "@/app/dashboard/quarter-selector";
import { useLessonData } from "@/app/hooks/use-lesson-data";
import { Quarter } from "@/app/types/types";

const Quarters = () => {
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter | undefined>(
    undefined,
  );
  const { quarters } = useLessonData(selectedQuarter);
  const router = useRouter();

  const handleQuarterSelect = (quarter: Quarter) => {
    setSelectedQuarter(quarter);
    const year = quarter.year;
    const slug = quarter.metadata.slug;
    console.log(`Selected quarter: ${slug} for year: ${year}`);
    router.push(`/home/${slug}/${year}/lessons`);
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
