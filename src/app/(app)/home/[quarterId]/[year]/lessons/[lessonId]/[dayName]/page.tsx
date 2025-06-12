"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Typography, Alert, Button, Box, IconButton } from "@mui/material";
import { useStudyProgress } from "@/app/hooks/use-study";
import { useAppSelector } from "@/app/store/hooks";
import { useLessonDay } from "@/app/hooks/use-lesson-day";
import { LessonsResponse, SectionType } from "@/app/types/types";
import Container from "@mui/material/Container";
import SabbathDay from "@/app/components/lesson-day/sabbath";
import FridayDay from "@/app/components/lesson-day/friday";
import WeekDay from "@/app/components/lesson-day/week-day";
import LessonDaySkeleton from "@/app/components/skeletons/lesson-day-skeleton";
import { Calendar1Icon } from "lucide-react";

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
  const decodedDayName = decodeURIComponent(dayName as string);

  const { progress, loading, error, markDayAsStudied } = useStudyProgress({
    userId,
    quarterSlug,
    lessonId: lessonId as string,
    dayName: decodedDayName,
    cohortId,
  });

  const {
    dayData: lesson,
    loading: lessonLoading,
    error: lessonError,
  } = useLessonDay(getLessonDetails(lessonId as string));

  const currentDayData = lesson?.days?.find((day) => {
    return day.day.toLowerCase() === decodedDayName.toLowerCase();
  });

  const dayIndex = lesson?.days.findIndex(
    (day) => day.day.toLowerCase() === decodedDayName.toLowerCase(),
  );

  const prevDay =
    dayIndex !== undefined && dayIndex > 0 ? lesson?.days[dayIndex - 1] : null;
  const nextDay =
    dayIndex !== undefined && dayIndex < (lesson?.days.length ?? 0) - 1
      ? lesson?.days[dayIndex + 1]
      : null;

  const router = useRouter();

  const handleNavigate = (targetDay: string) => {
    const encodedDay = encodeURIComponent(targetDay);
    router.push(
      `/home/${quarterSlug}/${lesson?.week_range?.start?.slice(
        0,
        4,
      )}/lessons/${lessonId}/${encodedDay}`,
    );
  };

  if (loading || lessonLoading) {
    return <LessonDaySkeleton />;
  }
  if (error || lessonError)
    return <Alert severity="error">{error || lessonError}</Alert>;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Typography variant="h4">
          {currentDayData?.title ?? "No Title"}
        </Typography>
        <IconButton
          sx={{ ml: 2 }}
          onClick={() => {
            const year = lesson?.week_range?.start?.slice(0, 4);
            if (lessonId && quarterSlug && year) {
              router.push(`/home/${quarterSlug}/${year}/lessons/${lessonId}`);
            }
          }}
        >
          <Calendar1Icon />
        </IconButton>
      </Box>

      {progress && (
        <>
          <Typography>
            <strong>Puntuación:</strong> {Math.round(progress.score * 100)}%
          </Typography>
          <Typography>
            <strong>Día:</strong> {decodeURIComponent(decodedDayName)}
          </Typography>
          <Typography>
            <strong>Días completados:</strong>{" "}
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
                  aiSummary={currentDayData.daySummary}
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
                  userId={userId}
                  quarterSlug={quarterSlug}
                  lessonId={lessonId as string}
                  dayName={decodedDayName}
                  cohortId={cohortId}
                  notes={progress?.notes || []}
                  aiSummary={currentDayData.daySummary}
                />
              )}

              {decodedDayName !== "Sábado" && decodedDayName !== "Viernes" && (
                <WeekDay
                  userId={userId}
                  quarterSlug={quarterSlug}
                  lessonId={lessonId as string}
                  dayName={decodedDayName}
                  cohortId={cohortId}
                  notes={progress?.notes || []}
                  aiSummary={currentDayData.daySummary}
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
      <Box
        sx={{ display: "flex", justifyContent: "space-between", mt: 4, mb: 2 }}
      >
        {prevDay && (
          <Button variant="text" onClick={() => handleNavigate(prevDay.day)}>
            ← {prevDay.day}
          </Button>
        )}

        {progress?.days_completed &&
        progress.days_completed.some(
          (day) => decodeURIComponent(day) === decodedDayName,
        ) ? (
          <Button variant="contained" disabled>
            <Typography variant="button">Estudiado</Typography>
          </Button>
        ) : (
          <Button onClick={markDayAsStudied} variant="outlined" color="primary">
            <Typography variant="button">Marcar como estudiado</Typography>
          </Button>
        )}
        {nextDay && (
          <Button variant="text" onClick={() => handleNavigate(nextDay.day)}>
            {nextDay.day} →
          </Button>
        )}
      </Box>
    </Container>
  );
};

export default DayView;
