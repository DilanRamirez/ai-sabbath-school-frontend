import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { useUpdateStudyProgress } from "@/app/hooks/use-update-study";
import { StudyNotes } from "@/app/types/types";

interface AnswerFieldProps {
  placeholder?: string;
  label?: string;
  userId: string;
  quarterSlug: string;
  lessonId: string;
  dayName: string;
  cohortId: string;
  notes: StudyNotes[];
  content: string; // Optional content prop for initial value
  questionId?: string;
}

export default function AnswerField({
  placeholder = "Tu respuesta",
  label = "Tu respuesta",
  userId,
  quarterSlug,
  lessonId,
  dayName,
  cohortId,
  questionId,
  notes,
  content,
}: AnswerFieldProps) {
  const initialNote =
    notes.find((n) => n.question_id === questionId && n.day === dayName)
      ?.note || "";

  const [noteText, setNoteText] = useState(initialNote);
  const { updateProgress } = useUpdateStudyProgress();

  const handleSaveNote = async () => {
    if (!questionId || !noteText.trim()) return;
    try {
      await updateProgress({
        user_id: userId,
        quarter: quarterSlug,
        lesson_id: lessonId,
        day: dayName,
        cohort_id: cohortId,
        mark_studied: false,
        note: noteText.trim(),
        question_id: questionId,
        content,
      });
      // Do not clear noteText after save, so it reflects saved content
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        multiline
        minRows={3}
        variant="outlined"
        placeholder={placeholder}
        label={label}
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        sx={{ backgroundColor: "white", mb: 1 }}
      />
      <Button onClick={handleSaveNote} variant="outlined">
        Guardar
      </Button>
    </Box>
  );
}
