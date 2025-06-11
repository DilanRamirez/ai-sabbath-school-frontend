import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/material";

import NotesIcon from "@mui/icons-material/Notes";

const NotesButton = ({ onClick }: { onClick: () => void }) => (
  <Box sx={{ mr: 1 }}>
    <Tooltip title="Notas">
      <IconButton onClick={onClick} size="small" sx={{ ml: 0 }}>
        <NotesIcon sx={{ color: "primary.secondary", fontSize: 18 }} />
      </IconButton>
    </Tooltip>
  </Box>
);

export default NotesButton;
