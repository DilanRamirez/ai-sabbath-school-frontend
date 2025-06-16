// src/app/components/report/ReportFilters.tsx
import React, { useState, useEffect, FC } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LessonsResponse, Quarter } from "@/app/types/types";

export interface ReportFiltersValue {
  quarterId: string;
  lessonId: string;
  days: string[]; // ["sábado", "domingo", ...]
  includeNotes: boolean; // always true if “all notes”
}

interface ReportFiltersProps {
  quarters: Quarter[];
  lessons: LessonsResponse[];
  // eslint-disable-next-line no-unused-vars
  onChange: (filters: ReportFiltersValue) => void;
}

export const ReportFilters: FC<ReportFiltersProps> = ({
  quarters,
  lessons,
  onChange,
}) => {
  const [quarterId, setQuarterId] = useState<string>("");
  const [lessonId, setLessonId] = useState<string>("");
  const [days, setDays] = useState<string[]>([]);
  const [includeNotes] = useState<boolean>(true);

  useEffect(() => {
    onChange({ quarterId, lessonId, days, includeNotes });
  }, [quarterId, lessonId, days, includeNotes, onChange]);

  // Helpers for days toggles
  const allDays = [
    "sábado",
    "domingo",
    "lunes",
    "martes",
    "miércoles",
    "jueves",
    "viernes",
  ];
  const toggleDay = (day: string) =>
    setDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  const selectAllDays = () => setDays(allDays);
  const clearAllDays = () => setDays([]);

  console.log("lessons", lessons);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box component="form" noValidate autoComplete="off" sx={{ mb: 4 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          {/* 1. Lesson / Quarter */}
          <FormControl fullWidth>
            <InputLabel id="sel-quarter-label">Lección / Trimestre</InputLabel>
            <Select
              labelId="sel-quarter-label"
              value={quarterId}
              label="Lección / Trimestre"
              onChange={(e) => setQuarterId(e.target.value)}
            >
              {quarters.map((q) => (
                <MenuItem key={q.slug} value={q.slug}>
                  {q.metadata.displayName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Lesson */}
          <FormControl fullWidth disabled={!quarterId}>
            <InputLabel id="sel-lesson-label">Lección</InputLabel>
            <Select
              labelId="sel-lesson-label"
              value={lessonId}
              label="Lección"
              onChange={(e) => setLessonId(e.target.value)}
            >
              {lessons.map((lesson) => (
                <MenuItem key={lesson.lesson_id} value={lesson.lesson_id}>
                  {lesson.metadata.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* 2. Days of the Week */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Días de la semana
            </Typography>
            <FormGroup row>
              {allDays.map((day) => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      checked={days.includes(day)}
                      onChange={() => toggleDay(day)}
                    />
                  }
                  label={day.charAt(0).toUpperCase() + day.slice(1)}
                />
              ))}
            </FormGroup>
            <Stack direction="row" spacing={1} mt={1}>
              <Button size="small" onClick={selectAllDays}>
                Seleccionar todo
              </Button>
              <Button size="small" onClick={clearAllDays}>
                Limpiar
              </Button>
            </Stack>
          </Box>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};
