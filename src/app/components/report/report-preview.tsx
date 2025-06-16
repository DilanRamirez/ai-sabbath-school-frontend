import React from "react";
import { Box, Typography } from "@mui/material";

interface ReportPreviewProps {
  url: string;
}

const ReportPreview: React.FC<ReportPreviewProps> = ({ url }) => {
  if (!url) {
    return (
      <Box sx={{ p: 2 }}>
        <Typography variant="body2" color="text.secondary">
          No hay vista previa disponible.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <iframe
        src={url}
        title="Vista previa del reporte"
        style={{ width: "100%", height: "100%", border: "none" }}
      />
    </Box>
  );
};

export default ReportPreview;
