"use client";
import React from "react";
import { Box, Typography } from "@mui/material";

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
  return (
    <Box px={2} py={4}>
      {/* Reading Section */}
      <Box mb={4}>
        <Typography variant="subtitle2" color="primary" gutterBottom>
          LEE PARA EL ESTUDIO DE ESTA SEMANA
        </Typography>
        <Typography variant="body1">{reading}</Typography>
      </Box>

      {/* Memory Verse */}
      <Box mb={4} bgcolor="#F4F6F8" p={2} borderRadius={2}>
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

      {/* Paragraphs */}
      {paragraphs.map((para, idx) => (
        <Box key={idx} mb={3}>
          <Typography variant="body1">{para}</Typography>
        </Box>
      ))}
    </Box>
  );
}
