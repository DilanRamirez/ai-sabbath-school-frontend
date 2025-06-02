"use client";
import React from "react";
import { useParams } from "next/navigation";
import { Typography, CircularProgress, Alert } from "@mui/material";
import { useStudyProgress } from "@/app/hooks/use-study";
import { useAppSelector } from "@/app/store/hooks";
import { useLessonDay } from "@/app/hooks/use-lesson-day";
import { LessonsResponse, SectionType } from "@/app/types/types";
import Container from "@mui/material/Container";
import SabbathDay from "@/app/components/lesson-day/sabbath";
import FridayDay from "@/app/components/lesson-day/friday";
import WeekDay from "@/app/components/lesson-day/week-day";

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

  const decodedDayName = decodeURIComponent(dayName as string);
  const currentDayData = lesson?.days?.find((day) => {
    return day.day.toLowerCase() === decodedDayName.toLowerCase();
  });

  if (loading || lessonLoading) return <CircularProgress />;
  if (error || lessonError)
    return <Alert severity="error">{error || lessonError}</Alert>;

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {decodedDayName}
      </Typography>

      {progress && (
        <>
          <Typography>
            <strong>Score:</strong> {Math.round(progress.score * 100)}%
          </Typography>
          <Typography>
            <strong>Days Completed:</strong>{" "}
            {progress.days_completed
              .map((day) => decodeURIComponent(day))
              .join(", ")}
          </Typography>
        </>
      )}
      {lesson && (
        <>
          {currentDayData && (
            <>
              <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
                {currentDayData.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {new Date(currentDayData.date).toLocaleDateString()}
              </Typography>

              {decodedDayName === "Sábado" && (
                <SabbathDay
                  reading={
                    currentDayData.sections
                      .find((s) => s.type === SectionType.READING)
                      ?.references?.join(", ") || ""
                  }
                  memoryVerse={lesson.memory_verse}
                  paragraphs={currentDayData.sections
                    .filter((s) => s.type === SectionType.PARAGRAPH)
                    .map((s) => s.content)}
                />
              )}

              {decodedDayName === "Viernes" && (
                <FridayDay
                  paragraph={
                    currentDayData.sections.find(
                      (s) => s.type === SectionType.PARAGRAPH,
                    )?.content || ""
                  }
                  quote={
                    currentDayData.sections.find(
                      (s) => s.type === SectionType.QUOTE,
                    )?.content || ""
                  }
                  author={
                    currentDayData.sections.find(
                      (s) => s.type === SectionType.QUOTE,
                    )?.author || ""
                  }
                  source={
                    currentDayData.sections.find(
                      (s) => s.type === SectionType.QUOTE,
                    )?.source || ""
                  }
                  questions={
                    currentDayData.sections.find(
                      (s) => s.type === SectionType.DISCUSSION_QUESTIONS,
                    )?.questions || []
                  }
                />
              )}

              {decodedDayName !== "Sábado" && decodedDayName !== "Viernes" && (
                <WeekDay
                  paragraphs={currentDayData.sections
                    .filter((s) => s.type === SectionType.PARAGRAPH)
                    .map((s) => s.content)}
                  bibleQuestion={
                    currentDayData.sections.find(
                      (s) => s.type === SectionType.BIBLE_QUESTION,
                    ) || { question: "" }
                  }
                  reflection={(() => {
                    const reflectionSection = currentDayData.sections.find(
                      (s) => s.type === SectionType.REFLECTION,
                    );
                    return reflectionSection
                      ? {
                          label: reflectionSection.label,
                          question: Array.isArray(reflectionSection.content)
                            ? reflectionSection.content.join(", ")
                            : reflectionSection.content || "",
                        }
                      : { question: "" };
                  })()}
                />
              )}
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default DayView;
