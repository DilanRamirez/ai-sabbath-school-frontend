/* eslint-disable react/prop-types */
import React, { useMemo } from "react";
import Link from "next/link";
import { LessonsResponse } from "@/app/types/types";
import { Box, Paper, Typography } from "@mui/material";
import salmos1 from "@/app/assets/salmos1.png";
import salmos2 from "@/app/assets/salmos2.png";
import salmos3 from "@/app/assets/salmos3.png";
import salmos4 from "@/app/assets/salmos4.png";

/**
 * Array of lesson cover images to cycle through.
 */
const lessonImages = [salmos1, salmos2, salmos3, salmos4];

/**
 * Props for LessonsList component.
 */
interface LessonsListProps {
  lessons: LessonsResponse[];
  quarterId: string;
  year: string;
}

/**
 * Single lesson card component.
 */
const LessonCard: React.FC<{
  lesson: LessonsResponse;
  index: number;
  quarterId: string;
  year: string;
}> = React.memo(({ lesson, index, quarterId, year }) => {
  const imageSrc = lessonImages[index % lessonImages.length].src;

  return (
    <li key={lesson.lesson_id}>
      <Link
        href={`/home/${quarterId}/${year}/lessons/${lesson.lesson_id}`}
        passHref
      >
        <Paper
          role="listitem"
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
              Lección {lesson.lesson_id.replace("lesson-", "")}
            </Typography>
            <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
              {lesson.metadata.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {new Date(lesson.metadata.week_range.start).toLocaleDateString(
                "es-ES",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                },
              )}{" "}
              –{" "}
              {new Date(lesson.metadata.week_range.end).toLocaleDateString(
                "es-ES",
                {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                },
              )}
            </Typography>
          </Box>
          <Box
            component="img"
            src={imageSrc}
            alt={`Lección ${index + 1} portada`}
            loading="lazy"
            sx={{
              width: 80,
              height: 80,
              objectFit: "cover",
              borderRadius: 2,
            }}
          />
        </Paper>
      </Link>
    </li>
  );
});
LessonCard.displayName = "LessonCard";

/**
 * List of lessons with proper states and accessibility.
 */
const LessonsList: React.FC<LessonsListProps> = ({
  lessons,
  quarterId,
  year,
}) => {
  // Memoize lesson cards to avoid re-rendering on parent updates
  const lessonItems = useMemo(() => {
    if (!Array.isArray(lessons) || lessons.length === 0) {
      return [];
    }
    // Sort lessons by their numeric ID suffix
    const sortedLessons = [...lessons].sort((a, b) => {
      const aNum = parseInt(a.lesson_id.replace(/^\D+/g, ""), 10);
      const bNum = parseInt(b.lesson_id.replace(/^\D+/g, ""), 10);
      return aNum - bNum;
    });
    return sortedLessons.map((lesson, idx) => (
      <LessonCard
        key={lesson.lesson_id}
        lesson={lesson}
        index={idx}
        quarterId={quarterId}
        year={year}
      />
    ));
  }, [lessons, quarterId, year]);

  if (lessonItems.length === 0) {
    return (
      <Typography role="status" color="text.secondary">
        No hay lecciones disponibles.
      </Typography>
    );
  }

  return (
    <Box
      component="ul"
      role="list"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        p: 0,
        m: 0,
        listStyle: "none",
      }}
    >
      {lessonItems}
    </Box>
  );
};

export default LessonsList;
