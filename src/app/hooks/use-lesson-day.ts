import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getLesson } from "../lib/api/lessons";
import { LessonsResponse, LessonWeek } from "../types/types";

export function useLessonDay(lessonMetadata: LessonsResponse | undefined) {
  const [lesson, setLesson] = useState<LessonWeek | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const yearFromUrl = typeof params?.year === "string" ? params.year : "";
  const quarterFromUrl =
    typeof params?.quarterId === "string" ? params.quarterId : "";
  const lessonIdFromUrl =
    typeof params?.lessonId === "string" ? params.lessonId : "";

  useEffect(() => {
    const year = lessonMetadata?.year || yearFromUrl;
    const quarter = lessonMetadata?.quarter || quarterFromUrl;
    const lessonId = lessonMetadata?.lesson_id || lessonIdFromUrl;

    if (!year || !quarter || !lessonId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    getLesson(year, quarter, lessonId)
      .then(setLesson)
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [lessonMetadata, yearFromUrl, quarterFromUrl, lessonIdFromUrl]);

  return { lesson, loading, error };
}
