import React, { useEffect, useMemo } from "react";
import { Card, CardContent, Box, Typography } from "@mui/material";
import { FormatQuote } from "@mui/icons-material";
import { DAILY_BIBLE_STUDY_VERSES } from "@/app/lib/utils";
import { useBibleReference } from "@/app/hooks/use-bible";
import { BibleReference } from "@/app/lib/api/bible";

// ----- Style Definitions -----
const styles = {
  cardWrapper: {
    background: "linear-gradient(135deg, #34495E 0%, #2C3E50 100%)",
    color: "white",
    borderRadius: 3,
    boxShadow: 4,
    mt: 2,
  },
  quoteIconBox: {
    bgcolor: "rgba(255,255,255,0.2)",
    p: 1.5,
    borderRadius: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quoteCard: {
    bgcolor: "rgba(255,255,255,0.1)",
    mb: 3,
  },
};

// ----- Subcomponent: Displays a Bible verse with reference -----
function InspirationalQuote({ citation }: { citation: BibleReference | null }) {
  if (!citation) return null;

  const { text, book, chapter, verse } = citation;

  return (
    <Card sx={styles.quoteCard}>
      <CardContent>
        <Typography
          variant="body2"
          sx={{ fontStyle: "italic", mb: 1, color: "white" }}
        >
          {text || "Versículo no disponible."}
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.7, color: "white" }}>
          - {book} {chapter}:{verse}
        </Typography>
      </CardContent>
    </Card>
  );
}

// ----- Main Component -----
export default function DailyInspirationCard() {
  const { data: verse, loading, error, fetchReference } = useBibleReference();

  // Select one random verse from the static list on initial render
  const selectedVerse = useMemo(() => {
    if (!DAILY_BIBLE_STUDY_VERSES.length) return null;
    const index = Math.floor(Math.random() * DAILY_BIBLE_STUDY_VERSES.length);
    return DAILY_BIBLE_STUDY_VERSES[index];
  }, []);

  // Trigger the API call to load the verse details
  useEffect(() => {
    if (selectedVerse) {
      fetchReference(selectedVerse);
    }
  }, [selectedVerse, fetchReference]);

  return (
    <Card sx={styles.cardWrapper}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: "flex", alignItems: "start", gap: 2, mb: 3 }}>
          <Box sx={styles.quoteIconBox}>
            <FormatQuote />
          </Box>
          <Box>
            <Typography variant="h3" sx={{ color: "white" }}>
              Inspiración Diaria
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              Reflexión y misión
            </Typography>
          </Box>
        </Box>

        <Box sx={{ mt: 3 }}>
          {loading ? (
            <Typography variant="body2" sx={{ color: "white", mt: 1 }}>
              Cargando versículo...
            </Typography>
          ) : error ? (
            <Typography variant="body2" sx={{ color: "white", mt: 1 }}>
              Error al cargar la cita bíblica.
            </Typography>
          ) : (
            <InspirationalQuote citation={verse} />
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
