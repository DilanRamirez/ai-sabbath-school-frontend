import { Card, CardContent, Box, Divider } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import BookIcon from "@mui/icons-material/Book";
import StarIcon from "@mui/icons-material/Star";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import { AiDaySummary } from "@/app/types/types";
import { List, ListItem, Typography } from "@mui/material";
import React, { FC } from "react";
import BibleReferenceModal from "@/app/components/lesson-day/shared/bible-reference-modal";
import { Button } from "@mui/material";

interface AiSummaryProps {
  aiSummary: AiDaySummary;
}
const AiSummary: FC<AiSummaryProps> = ({ aiSummary }) => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedReference, setSelectedReference] = React.useState<
    string | null
  >(null);

  const handleOpenModal = (ref: string) => {
    setSelectedReference(ref);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedReference(null);
  };

  return (
    <Card
      sx={{
        mb: 4,
      }}
      elevation={0}
    >
      <CardContent sx={{ p: 2 }}>
        {/* Header Row */}
        <Box display="flex" alignItems="center" mb={1}>
          <CalendarTodayIcon fontSize="small" color="disabled" />
          <Typography variant="subtitle2" color="text.secondary" ml={1}>
            {aiSummary.day} — {aiSummary.date}
          </Typography>
        </Box>
        {/* Summary Section */}
        <Box display="flex" alignItems="flex-start" mb={2}>
          <BookIcon
            fontSize="small"
            sx={{ color: "primary.main", mr: 1, mt: "2px" }}
          />
          <Typography variant="body1">{aiSummary.summary}</Typography>
        </Box>
        {/* Key Points */}
        <Divider sx={{ my: 1 }} />
        <Box display="flex" alignItems="center" mb={1}>
          <StarIcon fontSize="small" color="disabled" />
          <Typography variant="subtitle2" ml={1}>
            Puntos clave
          </Typography>
        </Box>
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
            <Divider sx={{ my: 1 }} />
            <Box display="flex" alignItems="center" mb={1}>
              <MenuBookIcon fontSize="small" color="disabled" />
              <Typography variant="subtitle2" ml={1}>
                Glosario
              </Typography>
            </Box>
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
            <Divider sx={{ my: 1 }} />
            <Box display="flex" alignItems="center" mb={1}>
              <FormatQuoteIcon fontSize="small" color="disabled" />
              <Typography variant="subtitle2" ml={1}>
                Citas bíblicas
              </Typography>
            </Box>
            <List dense disablePadding>
              {aiSummary.citations.map((cite, idx) => (
                <Box key={idx} sx={{ pl: 2, mb: 1 }}>
                  <Button
                    variant="text"
                    onClick={() => handleOpenModal(cite.reference)}
                    sx={{ textTransform: "none", p: 0 }}
                  >
                    <Typography variant="body2" color="primary">
                      {cite.reference}
                    </Typography>
                  </Button>
                </Box>
              ))}
            </List>
            <BibleReferenceModal
              open={openModal}
              reference={selectedReference}
              onClose={handleCloseModal}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default AiSummary;
