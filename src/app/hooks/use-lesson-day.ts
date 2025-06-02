import { useEffect, useState } from "react";
import { getLesson } from "../lib/api/lessons";
import { LessonsResponse, LessonWeek } from "../types/types";

export function useLessonDay(lessonMetadata: LessonsResponse | undefined) {
  const [lesson, setLesson] = useState<LessonWeek | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!lessonMetadata) {
      setLoading(false);
      return;
    }

    console.log(
      `Fetching lesson for ${lessonMetadata.year}-${lessonMetadata.quarter} - ${lessonMetadata.lesson_id}`,
    );
    setLoading(true);
    getLesson(
      lessonMetadata.year,
      lessonMetadata.quarter,
      lessonMetadata.lesson_id,
    )
      .then(setLesson)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [lessonMetadata]);

  return { lesson, loading, error };
}
