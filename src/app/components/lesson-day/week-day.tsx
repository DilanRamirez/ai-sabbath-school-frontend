"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

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
}

export default function WeekDay({
  paragraphs,
  bibleQuestion,
  reflection,
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
        <Typography variant="body1" fontStyle="italic">
          {bibleQuestion.question}
        </Typography>
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
      </Box>
    </Box>
  );
}
