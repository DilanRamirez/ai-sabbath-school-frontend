/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { FC, memo, useMemo } from "react";
import { Paper, Box, Typography } from "@mui/material";
import { Schedule, School, Group, CheckCircle } from "@mui/icons-material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineOppositeContent,
  TimelineDot,
} from "@mui/lab";
import { SuggestedFlow } from "@/app/types/types";

// Constants for styling and timeline steps
const ICON_COLOR_MAP: Record<string, string> = {
  opening: "#3498DB",
  study_block: "#8E44AD",
  application: "#E74C3C",
  close: "#2C3E50",
};

const ICON_COMPONENT_MAP: Record<string, React.ElementType> = {
  opening: Schedule,
  study_block: School,
  application: Group,
  close: CheckCircle,
};

// Single timeline step props
interface TimelineStep {
  key: keyof SuggestedFlow;
  label: string;
  durationLabel: string;
  description: string;
}

// Component for header section
const LessonHeader: FC<{ title: string; icon: React.ReactNode }> = memo(
  ({ title, icon }) => (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
      <Box
        sx={{
          bgcolor: ICON_COLOR_MAP.opening,
          color: "white",
          p: 1.5,
          borderRadius: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden
      >
        {icon}
      </Box>
      <Typography variant="h3" color="text.primary">
        {title}
      </Typography>
    </Box>
  ),
);

// Component for each timeline item
const LessonTimelineItem: FC<{
  step: TimelineStep;
  isFirst: boolean;
  isLast: boolean;
}> = memo(({ step, isFirst, isLast }) => {
  const Icon = ICON_COMPONENT_MAP[step.key];
  const color = ICON_COLOR_MAP[step.key];
  return (
    <TimelineItem>
      <TimelineOppositeContent
        sx={{ m: "auto 0" }}
        variant="body2"
        color="text.secondary"
        aria-label={step.durationLabel}
      >
        {step.durationLabel}
      </TimelineOppositeContent>
      <TimelineSeparator>
        {!isFirst && <TimelineConnector />}
        <TimelineDot sx={{ bgcolor: color, p: 1 }}>
          <Icon fontSize="small" htmlColor="#fff" />
        </TimelineDot>
        {!isLast && <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent sx={{ py: 1, px: 2 }}>
        <Typography variant="h6">{step.label}</Typography>
        <Typography variant="body2" color="text.secondary">
          {step.description}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
});

// Main component props
interface LessonStructureProps {
  suggestedFlow?: SuggestedFlow;
}

// Main component
const LessonStructure: FC<LessonStructureProps> = ({ suggestedFlow }) => {
  // Guard: no flow provided
  if (!suggestedFlow) {
    return null;
  }

  // Prepare steps for timeline
  const steps = useMemo<TimelineStep[]>(() => {
    const entries: [keyof SuggestedFlow, string][] = [
      ["opening", "Apertura"],
      ["study_block", "Bloque de Estudio"],
      ["application", "Aplicación"],
      ["close", "Cierre"],
    ];
    return entries.map(([key, label]) => ({
      key,
      label,
      durationLabel: suggestedFlow[key] ? suggestedFlow[key] : "—",
      description: suggestedFlow[key] ?? "",
    }));
  }, [suggestedFlow]);

  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
      <LessonHeader
        title="Estructura de la Lección (30 min)"
        icon={<Schedule />}
      />

      <Timeline position="alternate" sx={{ mt: 4 }}>
        {steps.map((step, idx) => (
          <LessonTimelineItem
            key={step.key}
            step={step}
            isFirst={idx === 0}
            isLast={idx === steps.length - 1}
          />
        ))}
      </Timeline>
    </Paper>
  );
};

export default memo(LessonStructure);
