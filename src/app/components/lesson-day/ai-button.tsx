import React, { FC } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

interface AiButtonProps {
  toggleActions: () => void;
}
const AiButton: FC<AiButtonProps> = ({ toggleActions }) => {
  return (
    <Box sx={{ mr: 1 }}>
      <Tooltip title="AI Action">
        <IconButton onClick={() => toggleActions()} size="small">
          <AutoAwesomeIcon sx={{ color: "primary.secondary", fontSize: 18 }} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};
export default AiButton;
