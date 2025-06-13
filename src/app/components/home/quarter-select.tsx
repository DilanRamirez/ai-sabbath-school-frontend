import React from "react";
import {
  Paper,
  Box,
  Typography,
  Card,
  CardContent,
  IconButton,
  Chip,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { LastPosition, Quarter } from "@/app/types/types";

interface QuarterSelectorProps {
  quarters: Quarter[];
  lastPosition: LastPosition | undefined;
  // eslint-disable-next-line no-unused-vars
  onSelect: (quarter: Quarter) => void;
}

export default function QuarterSelect({
  quarters,
  lastPosition,
  onSelect,
}: QuarterSelectorProps) {
  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h3" color="text.primary">
          Trimestres de Estudio
        </Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton size="small" color="primary">
            <ChevronLeft />
          </IconButton>
          <IconButton size="small" color="primary">
            <ChevronRight />
          </IconButton>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          overflowX: "auto",
          pb: 1,
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
            borderRadius: 3,
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#c1c1c1",
            borderRadius: 3,
          },
        }}
      >
        {quarters.map((quarter, i) => {
          const isActive = lastPosition?.quarter === quarter.metadata.slug;

          return (
            <Card
              key={i}
              onClick={() => onSelect(quarter)}
              sx={{
                minWidth: 200,
                cursor: "pointer",
                transition: "all 0.2s ease-in-out",
                bgcolor: isActive ? "primary.main" : "background.paper",
                color: isActive ? "white" : "text.primary",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 4,
                },
                ...(isActive && {
                  transform: "scale(1.02)",
                  boxShadow: 6,
                  m: 1,
                }),
              }}
            >
              <CardContent>
                <Typography variant="body2" sx={{ fontWeight: 500 }}>
                  {quarter.year}
                </Typography>
                <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
                  {quarter.metadata.displayName}
                </Typography>
                {isActive && (
                  <Chip
                    label="Activo"
                    size="small"
                    sx={{
                      bgcolor: "rgba(255,255,255,0.2)",
                      color: "white",
                      fontSize: "0.75rem",
                    }}
                  />
                )}
              </CardContent>
            </Card>
          );
        })}
      </Box>
    </Paper>
  );
}
