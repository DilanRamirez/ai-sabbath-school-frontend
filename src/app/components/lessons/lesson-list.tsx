import React from "react";
import Link from "next/link";
import { LessonsResponse } from "@/app/types/types";
import { List, ListItem, ListItemText } from "@mui/material";

interface Props {
  lessons: LessonsResponse[];
  quarterId: string;
}

const LessonsList: React.FC<Props> = ({ lessons, quarterId }) => {
  console.log("LessonsList rendered with lessons:", quarterId, lessons);
  return (
    <List>
      {lessons.map((lesson, index) => (
        <ListItem
          key={lesson.lesson_id}
          divider
          component={Link}
          href={`/quarters/${quarterId}/lessons/${lesson.lesson_id}`}
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
