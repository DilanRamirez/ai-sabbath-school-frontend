"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import AnswerField from "./answer-field";
import { StudyNotes } from "@/app/types/types";
import AiButton from "./ai-button";
import AiActions from "./ai-actions";
import { generateContext } from "@/app/lib/utils";

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
  const [openMap, setOpenMap] = useState<{ [key: string]: boolean }>({});
  const toggleSection = (id: string) =>
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  const dayContent = paragraphs.join(" ");

  return (
    <Box px={2} py={4}>
      {/* First Paragraph */}
      <Box mb={3} sx={{ ...style.passageWrapper, flexDirection: "column" }}>
        <Box sx={{ display: "flex" }}>
          <AiButton toggleActions={() => toggleSection(`para-${0}`)} />
          <Typography variant="body1">{paragraphs[0]}</Typography>
        </Box>
        {openMap[`para-${0}`] && (
          <Box mt={2}>
            <AiActions
              open={openMap[`para-${0}`]}
              context={generateContext(paragraphs[0], dayContent)}
            />
          </Box>
        )}
      </Box>

      {/* Bible Question */}
      <Box mb={4} p={2} bgcolor="#ECF0F1" borderRadius={2}>
        <Box sx={style.passageWrapper}>
          <AiButton toggleActions={() => toggleSection(`bible-q-${0}`)} />
          {bibleQuestion.label && (
            <Typography variant="subtitle2" color="text.secondary">
              {bibleQuestion.label}
            </Typography>
          )}
        </Box>

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
        <AiActions
          open={openMap[`bible-q-${0}`]}
          context={generateContext(bibleQuestion.question, dayContent)}
        />
      </Box>

      {/* Remaining Paragraphs */}
      {paragraphs.map((para, idx) => (
        <Box key={idx}>
          <Box mb={3} sx={style.passageWrapper}>
            <AiButton toggleActions={() => toggleSection(`para-${idx}`)} />
            <Typography variant="body1">{para}</Typography>
          </Box>
          <AiActions
            open={openMap[`para-${idx}`]}
            context={generateContext(para, dayContent)}
          />
        </Box>
      ))}
      {/* Reflection */}
      <Box mt={4} p={2} borderLeft={4} borderColor="primary.main">
        <Box sx={{ ...style.passageWrapper, flexDirection: "row" }}>
          <AiButton toggleActions={() => toggleSection(`reflection-${0}`)} />
          {reflection.label && (
            <Typography variant="subtitle2" color="primary">
              {reflection.label}
            </Typography>
          )}
        </Box>
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
        {openMap[`reflection-${0}`] && (
          <Box mt={2}>
            <AiActions
              open={openMap[`reflection-${0}`]}
              context={generateContext(reflection.question, dayContent)}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}

const style: { [key: string]: React.CSSProperties } = {
  passageWrapper: {
    display: "flex",
  },
};
