import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  userId,
  quarterSlug,
  lessonId,
  dayName,
  cohortId,
  questionId,
  notes,
  content,
}: AnswerFieldProps) {
  const router = useRouter();
  const initialNote =
    notes.find((n) => n.question_id === questionId && n.day === dayName)
      ?.note || "";

  useEffect(() => {
    setNoteText(initialNote);
  }, [initialNote]);

  const [noteText, setNoteText] = useState(initialNote);
  const { updateProgress } = useUpdateStudyProgress();

  const handleSaveNote = async () => {
    if (!questionId) return;
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
      router.refresh();
      if (!noteText.trim()) setNoteText("");
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
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
        sx={{
          backgroundColor: "white",
          mb: 1,
          // Notebook-style background lines
          "& .MuiInputBase-root": {
            background: `
              repeating-linear-gradient(
                to bottom,
                white,
                white 28px,
                #f7f7f7 28px,
                #f7f7f7 29px
              )
            `,
            paddingLeft: "12px",
            borderLeft: "3px solid rgb(182, 189, 199)",
          },
          // Make textarea resizable vertically
          "& .MuiInputBase-inputMultiline": {
            resize: "vertical",
            overflow: "auto",
          },
        }}
      />
      <Button onClick={handleSaveNote} variant="outlined">
        Guardar
      </Button>
    </Box>
  );
}
