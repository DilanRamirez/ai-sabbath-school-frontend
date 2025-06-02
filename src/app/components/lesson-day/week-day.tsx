"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import AnswerField from "./answer-field";
import { StudyNotes } from "@/app/types/types";

interface WeekDayProps {
  paragraphs: string[];
  bibleQuestion: {
    label?: string;
    question: string;
  };
  reflection: {
    label?: string;
    question: string;
  };
  notes: StudyNotes[]; // Optional prop for study progress record
  userId: string;
  quarterSlug: string;
  lessonId: string;
  dayName: string;
  cohortId: string;
}

export default function WeekDay({
  paragraphs,
  bibleQuestion,
  reflection,
  notes,
  userId,
  quarterSlug,
  lessonId,
  dayName,
  cohortId,
}: WeekDayProps) {
  return (
    <Box px={2} py={4}>
      {/* First Paragraph */}
      <Box mb={3}>
        <Typography variant="body1">{paragraphs[0]}</Typography>
      </Box>

      {/* Bible Question */}
      <Box mb={4} p={2} bgcolor="#ECF0F1" borderRadius={2}>
        {bibleQuestion.label && (
          <Typography variant="subtitle2" color="text.secondary">
            {bibleQuestion.label}
          </Typography>
        )}
        <Typography variant="body1" fontStyle="italic" mb={2}>
          {bibleQuestion.question}
        </Typography>
        <AnswerField
          userId={userId}
          quarterSlug={quarterSlug}
          lessonId={lessonId}
          dayName={dayName}
          cohortId={cohortId}
          questionId={`week-day-q-${bibleQuestion.question
            .replace(/\s+/g, "-")
            .toLowerCase()}`}
          notes={notes}
        />
      </Box>

      {/* Remaining Paragraphs */}
      {paragraphs.slice(1, 4).map((para, idx) => (
        <Box key={idx} mb={3}>
          <Typography variant="body1">{para}</Typography>
        </Box>
      ))}

      {/* Reflection */}
      <Box mt={4} p={2} borderLeft={4} borderColor="primary.main">
        {reflection.label && (
          <Typography variant="subtitle2" color="primary">
            {reflection.label}
          </Typography>
        )}
        <Typography variant="body1">{reflection.question}</Typography>
        <AnswerField
          userId={userId}
          quarterSlug={quarterSlug}
          lessonId={lessonId}
          dayName={dayName}
          cohortId={cohortId}
          questionId={`week-day-q-${bibleQuestion.question
            .replace(/\s+/g, "-")
            .toLowerCase()}`}
          notes={notes}
        />
      </Box>
    </Box>
  );
}
