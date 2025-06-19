"use client";
import React from "react";
import { Container, Box } from "@mui/material";
import LessonOverview from "./lesson-overview";
import TeachingGuide from "./teaching-guide";
import LessonStructure from "./lesson-structure";
import ResourcesPanel from "./resource-panel";
import {
  LessonDay,
  TeachingGuide as TeachingGuideType,
} from "@/app/types/types";

interface TeachersPageProps {
  teaching_guide: TeachingGuideType | null | undefined;
  currentDayData: LessonDay | undefined;
}
export default function TeachersPage({
  teaching_guide,
  currentDayData,
}: TeachersPageProps) {
  if (!teaching_guide) {
    return null;
  }
  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh", py: 3 }}>
      <Container maxWidth="xl">
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
              gap: 3,
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <LessonOverview teachingGuide={teaching_guide} />
              <TeachingGuide keyPoints={teaching_guide.key_points} />
              <LessonStructure suggestedFlow={teaching_guide.suggested_flow} />
            </Box>
            <ResourcesPanel
              missionMoment={teaching_guide.mission_moment}
              communityActivity={teaching_guide.community_activity}
              callToAction={teaching_guide.call_to_action}
              glossary={currentDayData?.daySummary.glossary}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
