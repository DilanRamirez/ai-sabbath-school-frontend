"use client";
import React, { useState } from "react";
import { Box, Typography, Paper, IconButton, Tooltip } from "@mui/material";
import NotesIcon from "@mui/icons-material/Notes";
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
      <Box
        mb={3}
        sx={{
          ...style.passageWrapper,
          flexDirection: "column",
          bgcolor: openMap["para-notes-0"]
            ? "rgba(144,202,249,0.1)"
            : undefined,
        }}
      >
        <Box sx={style.content}>
          <AiButton toggleActions={() => toggleSection(`para-${0}`)} />
          <NotesButton onClick={() => toggleSection(`para-notes-${0}`)} />
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
        {openMap[`para-notes-0`] && (
          <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
            <AnswerField
              userId={userId}
              quarterSlug={quarterSlug}
              lessonId={lessonId}
              dayName={dayName}
              cohortId={cohortId}
              questionId={`para-notes-0`}
              notes={notes}
              content={paragraphs[0]}
            />
          </Paper>
        )}
      </Box>

      {/* Bible Question */}
      <Box
        mb={4}
        p={2}
        bgcolor={openMap["bible-notes-0"] ? "rgba(144,202,249,0.1)" : "#ECF0F1"}
        borderRadius={2}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
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
          content={bibleQuestion.question}
        />
        <AiActions
          open={openMap[`bible-q-${0}`]}
          context={generateContext(bibleQuestion.question, dayContent)}
        />
      </Box>

      {/* Remaining Paragraphs */}
      {paragraphs.map((para, idx) => (
        <Box
          key={idx}
          sx={{
            ...style.passageWrapper,
            ...(openMap[`para-notes-${idx}`]
              ? { bgcolor: "rgba(144,202,249,0.1)" }
              : {}),
          }}
        >
          <Box mb={3} sx={style.content}>
            <AiButton toggleActions={() => toggleSection(`para-${idx}`)} />
            <NotesButton onClick={() => toggleSection(`para-notes-${idx}`)} />
            <Typography variant="body1">{para}</Typography>
          </Box>
          <AiActions
            open={openMap[`para-${idx}`]}
            context={generateContext(para, dayContent)}
          />
          {openMap[`para-notes-${idx}`] && (
            <Paper elevation={1} sx={{ p: 2, mb: 2 }}>
              <AnswerField
                userId={userId}
                quarterSlug={quarterSlug}
                lessonId={lessonId}
                dayName={dayName}
                cohortId={cohortId}
                questionId={`para-notes-${idx}`}
                notes={notes}
                content={para}
              />
            </Paper>
          )}
        </Box>
      ))}
      {/* Reflection */}
      <Box
        mt={4}
        p={2}
        borderLeft={4}
        borderColor="primary.main"
        bgcolor={
          openMap["reflection-notes-0"]
            ? "rgba(144,202,249,0.1)"
            : "transparent"
        }
      >
        <Box sx={style.content}>
          <AiButton toggleActions={() => toggleSection(`reflection-${0}`)} />
          <Typography variant="subtitle2" color="primary">
            {reflection.label}
          </Typography>
          <Typography variant="body1">{reflection.question}</Typography>
        </Box>

        <AnswerField
          userId={userId}
          quarterSlug={quarterSlug}
          lessonId={lessonId}
          dayName={dayName}
          cohortId={cohortId}
          questionId={`week-day-q-${reflection.question
            .replace(/\s+/g, "-")
            .toLowerCase()}`}
          notes={notes}
          content={reflection.question}
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

const NotesButton = ({ onClick }: { onClick: () => void }) => (
  <Box sx={{ mr: 1 }}>
    <Tooltip title="Notas">
      <IconButton onClick={onClick} size="small" sx={{ ml: 0 }}>
        <NotesIcon sx={{ color: "primary.secondary", fontSize: 18 }} />
      </IconButton>
    </Tooltip>
  </Box>
);

const style: { [key: string]: React.CSSProperties } = {
  passageWrapper: {
    display: "flex",
    flexDirection: "column",
    padding: 2,
  },
  content: {
    display: "flex",
    flexDirection: "row",
  },
};
