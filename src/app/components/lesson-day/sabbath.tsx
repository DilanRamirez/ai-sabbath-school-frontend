"use client";
import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import AiButton from "./ai-button";
import AiActions from "./ai-actions";

interface SabbathProps {
  reading: string;
  memoryVerse: {
    text: string;
    reference: string;
  };
  paragraphs: string[];
}

export default function SabbathDay({
  reading,
  memoryVerse,
  paragraphs,
}: SabbathProps) {
  const [openMap, setOpenMap] = useState<{ [key: string]: boolean }>({});
  const toggleSection = (id: string) =>
    setOpenMap((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <Box px={2} py={4}>
      {/* Reading Section */}
      <Box mb={4} sx={style.passageWrapper}>
        <Box>
          <Typography variant="subtitle2" color="primary" gutterBottom>
            LEE PARA EL ESTUDIO DE ESTA SEMANA
          </Typography>
          <Typography variant="body1">{reading}</Typography>
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
          <Typography variant="body2" color="text.secondary">
            {memoryVerse.reference}
          </Typography>
        </Box>
      </Box>
      <AiActions open={openMap["memory"]} context={memoryVerse.text} />

      {/* Paragraphs */}
      {paragraphs.map((para, idx) => (
        <Box key={idx}>
          <Box mb={3} sx={style.passageWrapper}>
            <AiButton toggleActions={() => toggleSection(`para-${idx}`)} />
            <Typography variant="body1">{para}</Typography>
          </Box>
          <AiActions open={openMap[`para-${idx}`]} context={para} />
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
