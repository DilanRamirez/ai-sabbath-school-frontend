import { AiDaySummary } from "@/app/types/types";
import { List, ListItem, Paper, Typography } from "@mui/material";
import React, { FC } from "react";

interface AiSummaryProps {
  aiSummary: AiDaySummary;
}
const AiSummary: FC<AiSummaryProps> = ({ aiSummary }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        bgcolor: "#F9FAFB",
        p: 2,
        mb: 4,
        borderLeft: 4,
        borderColor: "primary.light",
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {aiSummary.day} — {aiSummary.date}
      </Typography>
      <Typography variant="body1" paragraph>
        {aiSummary.summary}
      </Typography>
      <List dense disablePadding>
        {aiSummary.keyPoints.map((pt, idx) => (
          <ListItem key={idx} sx={{ display: "list-item", pl: 2 }}>
            <Typography variant="body2">{pt}</Typography>
          </ListItem>
        ))}
      </List>

      {/* Glossary */}
      {aiSummary.glossary && Object.keys(aiSummary.glossary).length > 0 && (
        <>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Glosario
          </Typography>
          <List dense disablePadding>
            {Object.entries(aiSummary.glossary).map(([term, def]) => (
              <ListItem key={term} sx={{ display: "list-item", pl: 2 }}>
                <Typography variant="body2">
                  <strong>{term}:</strong> {def}
                </Typography>
              </ListItem>
            ))}
          </List>
        </>
      )}

      {/* Citations */}
      {aiSummary.citations && aiSummary.citations.length > 0 && (
        <>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Citas bíblicas
          </Typography>
          <List dense disablePadding>
            {aiSummary.citations.map((cite, idx) => (
              <ListItem key={idx} sx={{ display: "list-item", pl: 2 }}>
                <Typography variant="body2">{cite.reference}</Typography>
              </ListItem>
            ))}
          </List>
        </>
      )}
    </Paper>
  );
};

export default AiSummary;
