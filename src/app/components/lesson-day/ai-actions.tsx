import {
  Box,
  Collapse,
  Tab,
  Tabs,
  Typography,
  TextField,
  Button,
  Divider,
  Grow,
  Fade,
} from "@mui/material";
import React, { FC, useCallback, useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useLLM } from "@/app/hooks/use-llm";
import { LLMMode } from "@/app/types/types";

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

/**
 * Renders AI actions with collapsible tabbed interface.
 */
const AiActions: FC<AiActionsProps> = ({ open, context }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [userQuestion, setUserQuestion] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const { getLLMResponse, responses, loading, error } = useLLM();

  const activeTabMode = useMemo(() => actionOptions[activeTab], [activeTab]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
    setShowResponse(false);
  };

  const handleAsk = useCallback(() => {
    const question = userQuestion.trim();
    if (!question) return;
    getLLMResponse(LLMMode.ASK, `${context}\n\n${question}`);
  }, [userQuestion, context, getLLMResponse]);

  const handleStandardRequest = useCallback(() => {
    getLLMResponse(activeTabMode, context);
    setShowResponse(true);
  }, [activeTabMode, context, getLLMResponse]);

  const renderResponse = (mode: LLMMode) => {
    const response = responses?.[mode]?.answer;
    if (loading)
      return <Typography variant="body1">Cargando respuesta...</Typography>;
    if (showResponse && response) {
      return <ReactMarkdown>{response}</ReactMarkdown>;
    }

    if (showResponse && !response)
      return (
        <Typography variant="body2">
          No hay respuesta para la acción {mode}
        </Typography>
      );
    return null;
  };

  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <Grow in={open} timeout={300}>
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
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
          >
            {actionOptions.map((option) => (
              <Tab
                key={option}
                label={option.charAt(0).toUpperCase() + option.slice(1)}
                sx={{ textTransform: "capitalize", fontWeight: 500 }}
              />
            ))}
          </Tabs>

          <Box
            id="ai-response-container"
            mt={2}
            bgcolor="white"
            p={2}
            borderRadius={1}
          >
            {activeTabMode === LLMMode.ASK ? (
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
                    onClick={handleAsk}
                    disabled={loading || !userQuestion.trim()}
                  >
                    Preguntar
                  </Button>
                </Box>
                {responses?.[LLMMode.ASK]?.answer && (
                  <Fade in={true}>
                    <Box mt={2}>
                      <Divider sx={{ mb: 2 }} />
                      <Typography variant="subtitle2" gutterBottom>
                        Respuesta:
                      </Typography>
                      <ReactMarkdown>
                        {responses[LLMMode.ASK].answer}
                      </ReactMarkdown>
                    </Box>
                  </Fade>
                )}
              </Box>
            ) : (
              <>
                <Box display="flex" justifyContent="center" mb={2}>
                  <Button
                    variant="contained"
                    onClick={handleStandardRequest}
                    disabled={loading}
                  >
                    Obtener respuesta
                  </Button>
                </Box>
                {renderResponse(activeTabMode)}
              </>
            )}
            {error && (
              <Typography color="error" variant="body2">
                {error}
              </Typography>
            )}
          </Box>
        </Box>
      </Grow>
    </Collapse>
  );
};

export default AiActions;
