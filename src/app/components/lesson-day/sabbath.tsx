"use client";
import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AiButton from "./ai-button";
import AiActions from "./ai-actions";
import { generateContext } from "@/app/lib/utils";
import { AiDaySummary } from "@/app/types/types";
import AiSummary from "./ai-summary";
import BibleReferenceModal from "./shared/bible-reference-modal";

interface SabbathProps {
  reading: string;
  memoryVerse: {
    text: string;
    reference: string;
  };
  paragraphs: string[];
  aiSummary: AiDaySummary;
}

export default function SabbathDay({
  reading,
  memoryVerse,
  paragraphs,
  aiSummary,
}: SabbathProps) {
  const [openMap, setOpenMap] = useState<{ [key: string]: boolean }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalReference, setModalReference] = useState<string | null>(null);

  const toggleSection = (id: string) =>
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));
  const dayContent = paragraphs.join(" ");

  const handleOpenModal = (ref: string) => {
    setModalReference(ref);
    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    setModalReference(null);
  };

  return (
    <Box px={2} py={4}>
      {/* AI-generated day summary */}
      <AiSummary aiSummary={aiSummary} />

      {/* Reading Section */}
      <Box mb={4} sx={style.passageWrapper}>
        <Box>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            LEE PARA EL ESTUDIO DE ESTA SEMANA
          </Typography>
          <Typography variant="body1" component="div">
            {reading.split(",").map((ref, idx) => {
              const trimmedRef = ref.trim();
              return (
                <React.Fragment key={idx}>
                  <Button
                    variant="text"
                    onClick={() => handleOpenModal(trimmedRef)}
                    sx={{ padding: 0, textTransform: "none", mr: 1 }}
                  >
                    <Typography variant="body1" color="primary">
                      {trimmedRef}
                    </Typography>
                  </Button>
                  {idx < reading.split(",").length - 1 && (
                    <Typography variant="body1" component="span">
                      ,{" "}
                    </Typography>
                  )}
                </React.Fragment>
              );
            })}
          </Typography>
        </Box>
      </Box>

      {/* Memory Verse */}
      <Box mb={4} sx={style.passageWrapper}>
        <AiButton toggleActions={() => toggleSection("memory")} />
        <Box bgcolor="#F4F6F8" p={2} borderRadius={2}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Versículo de memoria
          </Typography>
          <Typography variant="body1" fontWeight="bold">
            {memoryVerse.text}
          </Typography>
          <Button
            variant="text"
            onClick={() => handleOpenModal(memoryVerse.reference)}
            sx={{ padding: 0, textTransform: "none" }}
          >
            <Typography variant="body2" color="text.secondary">
              {memoryVerse.reference}
            </Typography>
          </Button>
        </Box>
      </Box>
      <AiActions
        open={openMap["memory"]}
        context={generateContext(memoryVerse.text, dayContent)}
      />

      {/* Bible Reference Modal */}
      <BibleReferenceModal
        open={modalOpen}
        reference={modalReference}
        onClose={handleCloseModal}
      />

      {/* Paragraphs */}
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
    </Box>
  );
}

const style: { [key: string]: React.CSSProperties } = {
  passageWrapper: {
    display: "flex",
  },
};
