import { useLLM } from "@/app/hooks/use-llm";
import { LLMMode } from "@/app/types/types";
import {
  Box,
  Collapse,
  Tab,
  Tabs,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import React, { FC, useState } from "react";
import ReactMarkdown from "react-markdown";

const actionOptions: LLMMode[] = [
  LLMMode.SUMMARIZE,
  LLMMode.REFLECT,
  LLMMode.ASK,
  LLMMode.APPLY,
  LLMMode.EXPLAIN,
];

interface AiActionsProps {
  open: boolean;
  context: string;
}

const AiActions: FC<AiActionsProps> = ({ open, context }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [userQuestion, setUserQuestion] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const { getLLMResponse, responses, loading, error } = useLLM();

  // Removed useEffect that calls getLLMResponse on tab/context/open changes

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    console.log("Tab changed to:", actionOptions[newValue]);
    setActiveTab(newValue);
    setShowResponse(false); // Reset on tab change
  };

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Box
        px={2}
        py={2}
        mb={2}
        border={1}
        borderRadius={2}
        borderColor="grey.300"
        bgcolor="grey.200"
      >
        <Tabs
          value={activeTab}
          onChange={handleChange}
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
        >
          {actionOptions.map((option) => (
            <Tab
              key={option}
              label={option.charAt(0).toUpperCase() + option.slice(1)}
              sx={{
                textTransform: "capitalize",
                fontWeight: 500,
              }}
            />
          ))}
        </Tabs>
        <Box mt={2} bgcolor={"white"} p={2} borderRadius={1}>
          {actionOptions[activeTab] === LLMMode.ASK ? (
            <Box>
              <TextField
                fullWidth
                label="Haz tu pregunta"
                variant="outlined"
                value={userQuestion}
                onChange={(e) => setUserQuestion(e.target.value)}
                sx={{ mb: 2 }}
              />
              <Box display="flex" justifyContent="center" mb={2}>
                <Button
                  variant="contained"
                  onClick={() =>
                    getLLMResponse(LLMMode.ASK, `${context}\n\n${userQuestion}`)
                  }
                  disabled={loading || !userQuestion.trim()}
                >
                  Preguntar
                </Button>
              </Box>
              {loading && (
                <Typography variant="body1" sx={{ mt: 2 }}>
                  Cargando respuesta...
                </Typography>
              )}
              {responses?.[LLMMode.ASK]?.answer && (
                <Box mt={2}>
                  <Divider sx={{ mb: 2 }} />
                  <Typography variant="subtitle2" gutterBottom>
                    Respuesta:
                  </Typography>
                  <ReactMarkdown>{responses[LLMMode.ASK].answer}</ReactMarkdown>
                </Box>
              )}
            </Box>
          ) : (
            <>
              <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => {
                    getLLMResponse(actionOptions[activeTab], context);
                    setShowResponse(true);
                  }}
                  disabled={loading}
                >
                  Obtener respuesta
                </Button>
              </Box>
              {loading && (
                <Typography variant="body1">Cargando respuesta...</Typography>
              )}
              {!loading &&
                showResponse &&
                responses?.[actionOptions[activeTab]]?.answer && (
                  <ReactMarkdown>
                    {responses?.[actionOptions[activeTab]]?.answer}
                  </ReactMarkdown>
                )}
              {!loading &&
                showResponse &&
                !responses?.[actionOptions[activeTab]]?.answer && (
                  <Typography variant="body2">
                    No hay respuesta para la acción {actionOptions[activeTab]}
                  </Typography>
                )}
            </>
          )}
          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Collapse>
  );
};

export default AiActions;
