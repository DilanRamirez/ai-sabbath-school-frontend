// src/app/components/shared/AnswerField.tsx
import React from "react";
import { TextField } from "@mui/material";

interface AnswerFieldProps {
  placeholder?: string;
  label?: string;
}

export default function AnswerField({
  placeholder = "Tu respuesta",
  label = "Tu respuesta",
}: AnswerFieldProps) {
  return (
    <TextField
      fullWidth
      multiline
      minRows={3}
      variant="outlined"
      placeholder={placeholder}
      label={label}
      sx={{ backgroundColor: "white", mt: 1 }}
    />
  );
}
