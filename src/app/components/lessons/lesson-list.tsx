import React from "react";
import Link from "next/link";
import { LessonsResponse } from "@/app/types/types";
import { Box, Paper, Typography } from "@mui/material";
import salmos1 from "@/app/assets/salmos1.png";
import salmos2 from "@/app/assets/salmos2.png";
import salmos3 from "@/app/assets/salmos3.png";
import salmos4 from "@/app/assets/salmos4.png";

interface Props {
  lessons: LessonsResponse[];
  quarterId: string;
  year: string;
}

const LessonsList: React.FC<Props> = ({ lessons, quarterId, year }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {lessons.map((lesson, index) => (
        <Paper
          key={lesson.lesson_id}
          component={Link}
          href={`/home/${quarterId}/${year}/lessons/${lesson.lesson_id}`}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            textDecoration: "none",
            color: "inherit",
            borderRadius: 2,
          }}
          elevation={1}
        >
          <Box flex={1} pr={2}>
            <Typography variant="caption" color="text.secondary">
              Lesson {index + 1}
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {lesson.metadata.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {lesson.metadata.week_range.start} -{" "}
              {lesson.metadata.week_range.end}
            </Typography>
          </Box>
          <Box
            component="img"
            src={[salmos1, salmos2, salmos3, salmos4][index % 4].src}
            alt={`lesson-${index + 1}`}
            sx={{
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Paper>
      ))}
    </Box>
  );
};

export default LessonsList;
