"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { useStudyProgress } from "@/app/hooks/use-study";
import { useAppSelector } from "@/app/store/hooks";
import { useLessonDay } from "@/app/hooks/use-lesson-day";
import { LessonsResponse } from "@/app/types/types";

const DayView = () => {
  const { lessonId, dayName, quarterId } = useParams();
  const { user } = useAppSelector((state) => state.user);
  const { lessons } = useAppSelector((state) => state.lessons);

  const getLessonDetails = (id: string): LessonsResponse | undefined => {
    return lessons.find((lesson) => lesson.lesson_id === id);
  };

  // 🔁 Replace with actual auth/cohort context
  const userId = user.email;
  const cohortId = user.studyGroupId || "test-cohort";
  const quarterSlug = quarterId as string;

  const { progress, loading, error } = useStudyProgress({
    userId,
    quarterSlug,
    lessonId: lessonId as string,
    dayName: dayName as string,
    cohortId,
  });

  const {
    lesson,
    loading: lessonLoading,
    error: lessonError,
  } = useLessonDay(getLessonDetails(lessonId as string));

  useEffect(() => {
    console.log("lesson:", lesson);
  }, [lesson]);

  if (loading || lessonLoading) return <CircularProgress />;
  if (error || lessonError)
    return <Alert severity="error">{error || lessonError}</Alert>;

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        {dayName?.toString().toUpperCase()}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Lesson ID: {lessonId?.toString()}
      </Typography>
      {progress && (
        <>
          <Typography>
            <strong>Score:</strong> {progress.score}
          </Typography>
          <Typography>
            <strong>Days Completed:</strong>{" "}
            {progress.days_completed.join(", ")}
          </Typography>
        </>
      )}
      {lesson && (
        <>
          <Typography variant="h5" sx={{ mt: 4 }}>
            {lesson.title}
          </Typography>
        </>
      )}
      {/* TODO: Render Bible reading and study content here */}
    </Box>
  );
};

export default DayView;
