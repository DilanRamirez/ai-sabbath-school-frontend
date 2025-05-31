import { useEffect, useState } from "react";
import { getLesson } from "../lib/api/lessons";
import { LessonsResponse } from "../types/types";

interface LessonData {
  title: string;
  memory_verse: string;
  week_start_date: string;
  week_end_date: string;
  days: Record<string, unknown>; // Update as needed for the lesson structure
}

export function useLessonDay(lessonMetadata: LessonsResponse | undefined) {
  const [lesson, setLesson] = useState<LessonData | null>(null);
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
