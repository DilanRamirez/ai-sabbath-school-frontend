import { Box, Collapse, Tab, Tabs, Typography } from "@mui/material";
import React, { FC, useState } from "react";

const actionOptions = [
  "Explicar",
  "Refleccionar",
  "Aplicar",
  "Resumir",
  "Preguntar",
];

interface AiActionsProps {
  open: boolean;
}

const AiActions: FC<AiActionsProps> = ({ open }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
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
        bgcolor="grey.50"
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
        <Box mt={2}>
          <Typography variant="body1">
            {/* Placeholder response */}
            {`Contenido generado por LLM para la acción "${actionOptions[activeTab]}"`}
          </Typography>
        </Box>
      </Box>
    </Collapse>
  );
};

export default AiActions;
