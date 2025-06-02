import { useLLM } from "@/app/hooks/use-llm";
import { LLMMode } from "@/app/types/types";
import { Box, Collapse, Tab, Tabs, Typography } from "@mui/material";
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
  const { getLLMResponse, responses, loading, error } = useLLM();

  // Removed useEffect that calls getLLMResponse on tab/context/open changes

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    console.log("Tab changed to:", actionOptions[newValue]);
    setActiveTab(newValue);
    getLLMResponse(actionOptions[newValue], context);
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
          {loading ? (
            <Typography variant="body1">Cargando respuesta...</Typography>
          ) : (
            <ReactMarkdown>
              {responses?.[actionOptions[activeTab]]?.answer ??
                `No hay respuesta para la acción "${actionOptions[activeTab]}"`}
            </ReactMarkdown>
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

// 320 *2.27% = 7.254 /12
// 720: taxes
