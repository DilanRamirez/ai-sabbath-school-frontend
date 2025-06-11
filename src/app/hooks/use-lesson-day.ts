import { useEffect, useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { getLesson } from "../lib/api/lessons";
import { LessonsResponse, LessonWeek } from "../types/types";

interface UseLessonDayResult {
  dayData: LessonWeek | null;
  loading: boolean;
  error: string | null;
}

/**
 * Hook to fetch and return data for a specific lesson day.
 * It reads identifiers from metadata or URL params.
 */
export function useLessonDay(metadata?: LessonsResponse): UseLessonDayResult {
  // Memoize extraction of URL parameters
  const params = useParams();
  const {
    quarterId: urlQuarter,
    year: urlYear,
    lessonId: urlLesson,
  } = useMemo(
    () => ({
      quarterId: typeof params?.quarterId === "string" ? params.quarterId : "",
      year: typeof params?.year === "string" ? params.year : "",
      lessonId: typeof params?.lessonId === "string" ? params.lessonId : "",
    }),
    [params],
  );

  // Prefer metadata passed in, otherwise use URL params
  const quarter = metadata?.quarter || urlQuarter;
  const year = metadata?.year || urlYear;
  const lessonId = metadata?.lesson_id || urlLesson;

  // Component state
  const [dayData, setDayData] = useState<LessonWeek | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Validate all identifiers are present
    if (!year || !quarter || !lessonId) {
      setError("Missing lesson parameters");
      setDayData(null);
      setLoading(false);
      return;
    }

    let isCanceled = false;

    async function fetchData() {
      setLoading(true);
      setError(null);
      try {
        const data = await getLesson(year, quarter, lessonId);
        if (!isCanceled) {
          setDayData(data);
        }
      } catch (err: any) {
        if (!isCanceled) {
          console.error("Failed to fetch lesson day:", err);
          setError(err?.message || "Could not load lesson day.");
        }
      } finally {
        if (!isCanceled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isCanceled = true;
    };
  }, [year, quarter, lessonId]);

  return { dayData, loading, error };
}
