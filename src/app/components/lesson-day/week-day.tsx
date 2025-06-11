/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
"use client";

import React, { FC, useState, useCallback, useMemo } from "react";
import { Box, Typography, Paper } from "@mui/material";
import AiButton from "./ai-button";
import AiActions from "./ai-actions";
import AnswerField from "./answer-field";
import { generateContext } from "@/app/lib/utils";
import { StudyNotes } from "@/app/types/types";
import NotesButton from "./notes-button";

interface WeekDayProps {
  paragraphs: string[];
  bibleQuestion: { label?: string; question: string };
  reflection: { label?: string; question: string };
  notes: StudyNotes[];
  userId: string;
  quarterSlug: string;
  lessonId: string;
  dayName: string;
  cohortId: string;
}

// Generic Section Wrapper with Notes toggle
const SectionWrapper: FC<{
  id: string;
  highlight: boolean;
  children: React.ReactNode;
}> = React.memo(({ highlight, children }) => (
  <Box
    mb={4}
    p={2}
    bgcolor={highlight ? "rgba(144,202,249,0.1)" : "transparent"}
    borderRadius={2}
  >
    {children}
  </Box>
));

const ParagraphSection: FC<{
  idx: number;
  text: string;
  dayContent: string;
  openMap: Record<string, boolean>;
  // eslint-disable-next-line no-unused-vars
  toggleSection: (id: string) => void;
  contextProps: {
    userId: string;
    quarterSlug: string;
    lessonId: string;
    dayName: string;
    cohortId: string;
    notes: StudyNotes[];
  };
}> = React.memo(
  ({ idx, text, dayContent, openMap, toggleSection, contextProps }) => {
    const sectionId = `para-${idx}`;
    const notesId = `para-notes-${idx}`;
    const hasNotesPanel = openMap[notesId];

    return (
      <SectionWrapper id={notesId} highlight={hasNotesPanel}>
        <Box display="flex" alignItems="center" mb={2}>
          <AiButton toggleActions={() => toggleSection(sectionId)} />

          <NotesButton onClick={() => toggleSection(notesId)} />
        </Box>
        <Typography variant="body1">{text}</Typography>
        {openMap[sectionId] && (
          <Box mt={2}>
            <AiActions
              open={openMap[sectionId]}
              context={generateContext(text, dayContent)}
            />
          </Box>
        )}
        {hasNotesPanel && (
          <Paper elevation={1} sx={{ p: 2, mt: 2 }}>
            <AnswerField
              {...contextProps}
              questionId={notesId}
              content={text}
            />
          </Paper>
        )}
      </SectionWrapper>
    );
  },
);

const BibleQuestionSection: FC<{
  question: string;
  label?: string;
  dayContent: string;
  openMap: Record<string, boolean>;
  // eslint-disable-next-line no-unused-vars
  toggleSection: (id: string) => void;
  contextProps: {
    userId: string;
    quarterSlug: string;
    lessonId: string;
    dayName: string;
    cohortId: string;
    notes: StudyNotes[];
  };
}> = React.memo(
  ({ question, label, dayContent, openMap, toggleSection, contextProps }) => {
    const sectionId = `bible-q-0`;
    const notesId = `bible-notes-0`;
    const hasNotesPanel = openMap[notesId];

    return (
      <SectionWrapper id={notesId} highlight={hasNotesPanel}>
        <Box display="flex" alignItems="center">
          <AiButton toggleActions={() => toggleSection(sectionId)} />
          {label && (
            <Typography
              variant="subtitle2"
              color="text.secondary"
              sx={{ ml: 1 }}
            >
              {label}
            </Typography>
          )}
        </Box>
        <Typography variant="body1" fontStyle="italic" mb={2}>
          {question}
        </Typography>
        <AnswerField
          {...contextProps}
          questionId={notesId}
          content={question}
        />
        {openMap[sectionId] && (
          <Box mt={2}>
            <AiActions
              open={openMap[sectionId]}
              context={generateContext(question, dayContent)}
            />
          </Box>
        )}
      </SectionWrapper>
    );
  },
);

const ReflectionSection: FC<{
  question: string;
  label?: string;
  dayContent: string;
  openMap: Record<string, boolean>;
  // eslint-disable-next-line no-unused-vars
  toggleSection: (id: string) => void;
  contextProps: {
    userId: string;
    quarterSlug: string;
    lessonId: string;
    dayName: string;
    cohortId: string;
    notes: StudyNotes[];
  };
}> = React.memo(
  ({ question, label, dayContent, openMap, toggleSection, contextProps }) => {
    const sectionId = `reflection-0`;
    const notesId = `reflection-notes-0`;
    const hasNotesPanel = openMap[notesId];

    return (
      <SectionWrapper id={notesId} highlight={hasNotesPanel}>
        <Box display="flex" alignItems="center" mb={1}>
          <AiButton toggleActions={() => toggleSection(sectionId)} />
          <Typography variant="subtitle2" color="primary" sx={{ ml: 1 }}>
            {label}
          </Typography>
        </Box>
        <Typography variant="body1">{question}</Typography>
        <AnswerField
          {...contextProps}
          questionId={notesId}
          content={question}
        />
        {openMap[sectionId] && (
          <Box mt={2}>
            <AiActions
              open={openMap[sectionId]}
              context={generateContext(question, dayContent)}
            />
          </Box>
        )}
      </SectionWrapper>
    );
  },
);

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
  // Tracks open/closed state of each section
  const [openMap, setOpenMap] = useState<Record<string, boolean>>({});
  const toggleSection = useCallback(
    (id: string) => setOpenMap((prev) => ({ ...prev, [id]: !prev[id] })),
    [],
  );

  // Combined day content for AI context
  const dayContent = useMemo(() => paragraphs.join(" "), [paragraphs]);

  const contextProps = useMemo(
    () => ({ userId, quarterSlug, lessonId, dayName, cohortId, notes }),
    [userId, quarterSlug, lessonId, dayName, cohortId, notes],
  );

  return (
    <Box px={2} py={4}>
      <ParagraphSection
        idx={0}
        text={paragraphs[0]}
        dayContent={dayContent}
        openMap={openMap}
        toggleSection={toggleSection}
        contextProps={contextProps}
      />

      <BibleQuestionSection
        question={bibleQuestion.question}
        label={bibleQuestion.label}
        dayContent={dayContent}
        openMap={openMap}
        toggleSection={toggleSection}
        contextProps={contextProps}
      />

      {paragraphs.slice(1).map((para, idx) => (
        <ParagraphSection
          key={idx + 1}
          idx={idx + 1}
          text={para}
          dayContent={dayContent}
          openMap={openMap}
          toggleSection={toggleSection}
          contextProps={contextProps}
        />
      ))}

      <ReflectionSection
        question={reflection.question}
        label={reflection.label}
        dayContent={dayContent}
        openMap={openMap}
        toggleSection={toggleSection}
        contextProps={contextProps}
      />
    </Box>
  );
}
