import React from "react";
import {
  Paper,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Divider,
} from "@mui/material";
import {
  ExpandMore,
  Psychology,
  QuestionAnswer,
  Image,
} from "@mui/icons-material";

interface KeyPoint {
  title: string;
  explanation: string;
  content: string;
  illustration: string;
  discussion_questions: string[];
}

interface TeachingGuideProps {
  keyPoints: KeyPoint[];
}

export default function TeachingGuide({ keyPoints }: TeachingGuideProps) {
  return (
    <Paper elevation={2} sx={{ p: 4, borderRadius: 3 }}>
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Box
          sx={{
            bgcolor: "#27AE60",
            color: "white",
            p: 1.5,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Psychology />
        </Box>
        <Typography variant="h3" color="text.primary">
          Puntos Clave de Enseñanza
        </Typography>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {keyPoints.map((point, index) => (
          <Accordion
            key={index}
            sx={{ borderRadius: 2, "&:before": { display: "none" } }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                bgcolor: "rgba(39, 174, 96, 0.1)",
                borderRadius: 2,
                "&.Mui-expanded": {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  width: "100%",
                }}
              >
                <Chip
                  label={`Punto ${index + 1}`}
                  size="small"
                  sx={{ bgcolor: "#27AE60", color: "white", fontWeight: 600 }}
                />
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, color: "text.primary" }}
                >
                  {point.title}
                </Typography>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ p: 3 }}>
              {/* Explanation */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "#27AE60", fontWeight: 600 }}
                >
                  💡 Explicación para el Maestro
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.7, color: "text.secondary", mb: 2 }}
                >
                  {point.explanation}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Content */}
              <Box sx={{ mb: 3 }}>
                <Typography
                  variant="h6"
                  sx={{ mb: 2, color: "#2C3E50", fontWeight: 600 }}
                >
                  📖 Contenido de la Lección
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ lineHeight: 1.7, color: "text.primary", mb: 2 }}
                >
                  {point.content}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              {/* Illustration */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Image sx={{ color: "#F39C12" }} />
                  <Typography
                    variant="h6"
                    sx={{ color: "#F39C12", fontWeight: 600 }}
                  >
                    Ilustración Sugerida
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "rgba(243, 156, 18, 0.1)",
                    borderRadius: 2,
                    borderLeft: "4px solid #F39C12",
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontStyle: "italic" }}
                  >
                    {point.illustration}
                  </Typography>
                </Box>
              </Box>

              {/* Discussion Questions */}
              <Box>
                <Box
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <QuestionAnswer sx={{ color: "#8E44AD" }} />
                  <Typography
                    variant="h6"
                    sx={{ color: "#8E44AD", fontWeight: 600 }}
                  >
                    Preguntas para Discusión
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {point.discussion_questions.map((question, qIndex) => (
                    <Box
                      key={qIndex}
                      sx={{
                        p: 2,
                        bgcolor: "rgba(142, 68, 173, 0.1)",
                        borderRadius: 2,
                        borderLeft: "3px solid #8E44AD",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "text.primary", fontWeight: 500 }}
                      >
                        {qIndex + 1}. {question}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Paper>
  );
}
