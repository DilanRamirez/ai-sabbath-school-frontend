import React, { FC, useCallback, useMemo, useState } from "react";
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
import ReactMarkdown from "react-markdown";
import { useLLM } from "@/app/hooks/use-llm";
import { LLMMode } from "@/app/types/types";

// Available AI action modes
const ACTION_MODES: LLMMode[] = [
  LLMMode.SUMMARIZE,
  LLMMode.REFLECT,
  LLMMode.ASK,
  LLMMode.APPLY,
  LLMMode.EXPLAIN,
];

/**
 * Tab panel for "Ask" mode, with question input.
 */
const AskTabPanel: FC<{
  isLoading: boolean;
  result?: string;
  error?: string | null;
  // eslint-disable-next-line no-unused-vars
  onAsk: (question: string) => void;
}> = ({ isLoading, result, error, onAsk }) => {
  const [question, setQuestion] = useState("");

  const handleAsk = () => {
    const trimmed = question.trim();
    if (trimmed) onAsk(trimmed);
  };

  return (
    <Box>
      <TextField
        fullWidth
        label="Haz tu pregunta"
        variant="outlined"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant="contained"
          onClick={handleAsk}
          disabled={isLoading || !question.trim()}
        >
          Preguntar
        </Button>
      </Box>
      {isLoading && (
        <Typography variant="body1">Cargando respuesta...</Typography>
      )}
      {result && (
        <Fade in>
          <Box mt={2}>
            <Divider sx={{ mb: 2 }} />
            <Typography variant="subtitle2" gutterBottom>
              Respuesta:
            </Typography>
            <ReactMarkdown>{result}</ReactMarkdown>
          </Box>
        </Fade>
      )}
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </Box>
  );
};

/**
 * Tab panel for standard AI modes (summarize, reflect, etc.).
 */
const StandardTabPanel: FC<{
  mode: LLMMode;
  isLoading: boolean;
  result?: string;
  error?: string | null;
  onRequest: () => void;
  showResponse: boolean;
}> = ({ mode, isLoading, result, error, onRequest, showResponse }) => (
  <Box>
    <Box display="flex" justifyContent="center" mb={2}>
      <Button variant="contained" onClick={onRequest} disabled={isLoading}>
        Obtener respuesta
      </Button>
    </Box>
    {isLoading && (
      <Typography variant="body1">Cargando respuesta...</Typography>
    )}
    {result && <ReactMarkdown>{result}</ReactMarkdown>}
    {showResponse && !isLoading && !result && (
      <Typography variant="body2" color="text.secondary">
        No hay respuesta para la acción {mode}
      </Typography>
    )}
    {error && (
      <Typography color="error" variant="body2">
        {error}
      </Typography>
    )}
  </Box>
);

/**
 * AI Actions component: shows tabs for different LLM modes.
 */
const AiActions: FC<{ open: boolean; context: string }> = ({
  open,
  context,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [showResponse, setShowResponse] = useState(false);
  const { fetchLLMResult, results, isLoading, error } = useLLM();

  // Which mode is active
  const activeMode = useMemo(() => ACTION_MODES[activeTab], [activeTab]);

  const handleTabChange = useCallback(
    (_: React.SyntheticEvent, newIndex: number) => {
      setActiveTab(newIndex);
      setShowResponse(false);
    },
    [],
  );

  // Handlers for each mode
  const handleStandard = useCallback(() => {
    fetchLLMResult(activeMode, context);
    setShowResponse(true);
  }, [activeMode, context, fetchLLMResult]);

  const handleAsk = useCallback(
    (question: string) => {
      fetchLLMResult(LLMMode.ASK, `${context}\n\n${question}`);
    },
    [context, fetchLLMResult],
  );

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
          aria-busy={isLoading}
        >
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            variant="fullWidth"
            textColor="primary"
            indicatorColor="primary"
            aria-label="AI action tabs"
          >
            {ACTION_MODES.map((mode) => (
              <Tab
                key={mode}
                label={
                  mode.charAt(0).toUpperCase() + mode.slice(1).toLowerCase()
                }
                sx={{ textTransform: "capitalize", fontWeight: 500 }}
                id={`ai-tab-${mode}`}
                aria-controls={`ai-tabpanel-${mode}`}
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
            {activeMode === LLMMode.ASK ? (
              <AskTabPanel
                isLoading={isLoading}
                result={results[LLMMode.ASK]?.answer}
                error={error}
                onAsk={handleAsk}
              />
            ) : (
              <StandardTabPanel
                mode={activeMode}
                isLoading={isLoading}
                result={results[activeMode]?.answer}
                error={error}
                onRequest={handleStandard}
                showResponse={showResponse}
              />
            )}
          </Box>
        </Box>
      </Grow>
    </Collapse>
  );
};

export default React.memo(AiActions);
