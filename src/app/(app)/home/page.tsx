"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import QuarterSelector from "@/app/dashboard/quarter-selector";
import { useLessonData } from "@/app/hooks/use-lesson-data";
import { Quarter } from "@/app/types/types";
import WelcomeHeader from "@/app/components/home/welcome-header";
import { useAppSelector } from "@/app/store/hooks";
import TodayHighlight from "@/app/components/home/today-card";
import { useHomeStudyData } from "@/app/hooks/use-home-study";

/**
 * Home page component displays available quarters for selection and navigation.
 */
const HomePage: React.FC = () => {
  const [selectedQuarter, setSelectedQuarter] = useState<Quarter>();
  const { user } = useAppSelector((state) => state.user);
  const email = user?.email;
  const { quarters, loading, error } = useLessonData(selectedQuarter);
  const {
    lastPosition,
    loading: userDataLoading,
    error: userDataError,
  } = useHomeStudyData(email);
  const router = useRouter();

  /**
   * Handle selection of a quarter:
   *  - update state
   *  - navigate to the corresponding lessons page
   */
  const handleQuarterSelect = useCallback(
    (quarter: Quarter) => {
      setSelectedQuarter(quarter);
      const {
        metadata: { slug },
        year,
      } = quarter;
      router.push(`/home/${slug}/${year}/lessons`);
    },
    [router],
  );

  // Show loading spinner while fetching quarters
  if (loading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  // Show error message if fetching quarters fails
  if (error) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Typography color="error">Error: {error}</Typography>
        </Box>
      </Container>
    );
  }

  // Show fallback if no quarters are available
  if (!quarters || quarters.length === 0) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Typography>No hay trimestres disponibles.</Typography>
        </Box>
      </Container>
    );
  }

  if (userDataLoading) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (userDataError) {
    return (
      <Container maxWidth="lg">
        <Box sx={{ mt: 4 }}>
          <Typography color="error">
            Error cargando progreso: {userDataError}
          </Typography>
        </Box>
      </Container>
    );
  }

  console.log("Last position:", lastPosition);

  return (
    <Container
      maxWidth="lg"
      sx={{
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Box
        sx={{
          mt: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
          gap: { xs: 2, sm: 3, md: 4 },
        }}
      >
        <WelcomeHeader user={user} />
        <QuarterSelector quarters={quarters} onSelect={handleQuarterSelect} />
        {lastPosition && <TodayHighlight lastPosition={lastPosition} />}
        {/* <LessonPreviewHome lastPosition={lastPosition} />
        <ProgressSummary summary={progressSummary} />
        <MotivationalCard /> */}
      </Box>
    </Container>
  );
};

export default HomePage;
