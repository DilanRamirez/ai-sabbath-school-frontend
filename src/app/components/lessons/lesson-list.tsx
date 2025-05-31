import React from "react";
import Link from "next/link";
import { LessonsResponse } from "@/app/types/types";
import { List, ListItem, ListItemText } from "@mui/material";

interface Props {
  lessons: LessonsResponse[];
}

const LessonsList: React.FC<Props> = ({ lessons }) => {
  return (
    <List>
      {lessons.map((lesson, index) => (
        <ListItem
          key={lesson.lesson_id}
          divider
          component={Link}
          href={`/lessons/${lesson.lesson_id}`}
        >
          <ListItemText
            primary={`Lesson ${index + 1}: ${lesson.metadata.title}`}
            secondary={`Date: ${lesson.metadata.week_range.start} - ${lesson.metadata.week_range.end}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default LessonsList;
