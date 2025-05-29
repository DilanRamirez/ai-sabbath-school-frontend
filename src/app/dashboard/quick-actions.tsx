import React from "react";
import { Stack, Button } from "@mui/material";
import { BookOpen, MessageSquare, FileText, Users } from "lucide-react";

const QuickActions: React.FC = () => {
  return (
    <Stack spacing={2} direction="row" flexWrap="wrap">
      <Button variant="outlined" startIcon={<BookOpen />}>
        Lección de Hoy
      </Button>
      <Button variant="outlined" startIcon={<Users />}>
        Unirse a Cohorte
      </Button>
      <Button variant="outlined" startIcon={<FileText />}>
        Reflexionar
      </Button>
      <Button variant="outlined" startIcon={<MessageSquare />}>
        Preguntar
      </Button>
    </Stack>
  );
};

export default QuickActions;
