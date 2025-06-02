"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import AnswerField from "./answer-field";
import { StudyNotes } from "@/app/types/types";

interface FridayProps {
  paragraph: string;
  quote: string;
  author?: string; // Optional author for the quote
  source?: string; // Optional source for the quote
  questions: string[];
  userId: string;
  quarterSlug: string;
  lessonId: string;
  dayName: string;
  cohortId: string;
  notes: StudyNotes[]; // Optional prop for study progress record
}

export default function FridayDay({
  paragraph,
  quote,
  author,
  source,
  questions,
  userId,
  quarterSlug,
  lessonId,
  dayName,
  cohortId,
  notes,
}: FridayProps) {
  return (
    <Box px={2} py={4}>
      {/* Paragraph Section */}
      <Box mb={4}>
        <Typography variant="body1">{paragraph}</Typography>
      </Box>

      {/* Quote Section */}
      {quote && (
        <Box mb={4} pl={2} borderLeft={4} borderColor="grey.300">
          <Typography variant="body2" fontStyle="italic" color="text.secondary">
            {quote}
            {author && (
              <>
                <b>
                  — {author}
                  {source ? `, ${source}` : ""}
                </b>
              </>
            )}
          </Typography>
        </Box>
      )}

      {/* Discussion Questions */}
      <Box>
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Preguntas para dialogar
        </Typography>
        {questions.map((q, index) => (
          <Box key={index} mb={2}>
            <Typography variant="body1">{`${q}`}</Typography>
            <AnswerField
              userId={userId}
              quarterSlug={quarterSlug}
              lessonId={lessonId}
              dayName={dayName}
              cohortId={cohortId}
              questionId={`friday-q-${index.toString()}`}
              notes={notes}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
