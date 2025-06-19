import React from "react";
import {
  Paper,
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
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
    <Paper
      elevation={2}
      sx={{
        p: 4,
        borderRadius: 3,
        width: "100%",
        boxSizing: "border-box",
        overflowX: "hidden",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "background.paper",
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

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {keyPoints.map((point, index) => (
          <Accordion
            key={index}
            sx={{ "&:before": { display: "none", padding: 0 } }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore sx={{ color: "#fff" }} />}
              sx={{
                bgcolor: "primary.main",
                color: "background.paper",
                borderRadius: 2,
                pr: 2,
                pl: 2,
                // force a smaller, consistent header height on all devices
                minHeight: 10,
                "&.Mui-expanded": {
                  borderBottomLeftRadius: 0,
                  borderBottomRightRadius: 0,
                  minHeight: 48,
                },
                // adjust the internal content margins so text centers vertically
                "& .MuiAccordionSummary-content": {
                  margin: "12px 0",
                },
                "& .MuiAccordionSummary-content.Mui-expanded": {
                  margin: "12px 0",
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
                <Typography
                  variant="body2"
                  fontWeight={600}
                  sx={{ color: "#fff" }}
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
                  sx={{ mb: 2, color: "primary.main", fontWeight: 600 }}
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
                  sx={{ mb: 2, color: "primary.main", fontWeight: 600 }}
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
                  <Image sx={{ color: "primary.main" }} />
                  <Typography
                    variant="h6"
                    sx={{ color: "primary.main", fontWeight: 600 }}
                  >
                    Ilustración Sugerida
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 2,
                    bgcolor: "rgba(44, 62, 80, 0.05)",
                    color: "#000",
                    borderLeftWidth: "4px",
                    borderLeftStyle: "solid",
                    borderLeftColor: "primary.main",
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: "primary.main", fontStyle: "italic" }}
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
                  <QuestionAnswer sx={{ color: "primary.main" }} />
                  <Typography
                    variant="h6"
                    sx={{ color: "primary.main", fontWeight: 600 }}
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
                        bgcolor: "rgba(44, 62, 80, 0.05)",
                        borderLeftWidth: "3px",
                        borderLeftStyle: "solid",
                        borderLeftColor: "primary.main",
                        borderRadius: 2,
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
