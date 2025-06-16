"use client";

import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Box, Container, CircularProgress, Typography } from "@mui/material";
import QuarterSelector from "@/app/dashboard/quarter-selector";
import { useLessonData } from "@/app/hooks/use-lesson-data";
import { Quarter } from "@/app/types/types";
import WelcomeHeader from "@/app/components/home/welcome-header";
import Disclaimer from "@/app/components/home/disclaimer";
import { useAppSelector } from "@/app/store/hooks";
import TodayCard from "@/app/components/home/today-card";
import { useHomeStudyData } from "@/app/hooks/use-home-study";
import LessonPreviewHome from "@/app/components/home/lesson-preview";
import MotivationalCard from "@/app/components/home/motivational-card";
import QuarterSelect from "@/app/components/home/quarter-select";

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
    lessonProgress,
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
          <Typography>
            {loading
              ? "Cargando contenido..."
              : "No hay trimestres disponibles."}
          </Typography>
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
    if (userDataError.includes("No progress records found for user")) {
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
            <QuarterSelector
              quarters={quarters}
              onSelect={handleQuarterSelect}
            />
          </Box>
        </Container>
      );
    }

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
        <Disclaimer />
        <WelcomeHeader user={user} />
        <QuarterSelect
          lastPosition={lastPosition?.position}
          quarters={quarters}
          onSelect={handleQuarterSelect}
        />
        {lastPosition && <TodayCard lastPosition={lastPosition} />}
        {lastPosition && lastPosition && (
          <LessonPreviewHome
            lessonProgress={lessonProgress}
            lessonMetadata={lastPosition?.metadata}
            user={user}
          />
        )}

        <MotivationalCard />
      </Box>
    </Container>
  );
};

export default HomePage;
