"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import AnswerField from "./answer-field";
import { AiDaySummary, StudyNotes } from "@/app/types/types";
import AiButton from "./ai-button";
import AiActions from "./ai-actions";
import { generateContext } from "@/app/lib/utils";
import AiSummary from "./ai-summary";

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
  year: string; // Optional year prop for updateStudyProgress
  aiSummary: AiDaySummary;
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
  year,
  aiSummary,
}: FridayProps) {
  const [openMap, setOpenMap] = useState<{ [key: string]: boolean }>({});
  const toggleSection = (id: string) =>
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  const dayContent = paragraph + " " + quote;

  return (
    <Box px={2} py={4}>
      {/* Paragraph Section */}
      <AiSummary aiSummary={aiSummary} />

      <Box mb={4}>
        <Box sx={{ display: "flex" }}>
          <AiButton toggleActions={() => toggleSection(`para-${0}`)} />
          <Typography variant="body1">{paragraph}</Typography>
        </Box>
        {openMap[`para-${0}`] && (
          <Box mt={2}>
            <AiActions
              open={openMap[`para-${0}`]}
              context={generateContext(paragraph, dayContent)}
            />
          </Box>
        )}
      </Box>

      {/* Quote Section */}
      {quote && (
        <Box mb={4} pl={2} borderLeft={4} borderColor="grey.300">
          <Box sx={{ display: "flex" }}>
            <AiButton toggleActions={() => toggleSection(`quote-${0}`)} />
            <Box>
              <Typography variant="body1">{quote}</Typography>
              <Typography
                variant="body2"
                fontStyle="italic"
                color="text.secondary"
              >
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
          </Box>
          {openMap[`quote-${0}`] && (
            <Box mt={2}>
              <AiActions
                open={openMap[`quote-${0}`]}
                context={generateContext(quote, dayContent)}
              />
            </Box>
          )}
        </Box>
      )}

      {/* Discussion Questions */}
      <Box>
        <Typography variant="subtitle2" color="primary" gutterBottom>
          Preguntas para dialogar
        </Typography>
        {questions.map((q, index) => (
          <Box key={index} mb={2}>
            <Box display="flex" sx={style.passageWrapper}>
              <AiButton
                toggleActions={() => toggleSection(`dialogue-q-${index}`)}
              />
              <Typography variant="body1">{q}</Typography>
            </Box>
            <AnswerField
              year={year}
              userId={userId}
              quarterSlug={quarterSlug}
              lessonId={lessonId}
              dayName={dayName}
              cohortId={cohortId}
              questionId={`dialogue-q-${index}`}
              notes={notes}
              content={q}
            />
            {openMap[`dialogue-q-${index}`] && (
              <Box mt={2}>
                <AiActions
                  open={openMap[`dialogue-q-${index}`]}
                  context={generateContext(q, dayContent)}
                />
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const style: { [key: string]: React.CSSProperties } = {
  passageWrapper: {
    display: "flex",
  },
};
