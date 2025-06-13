import { useEffect, useState } from "react";
import {
  getLastPosition,
  getLessonProgress,
  getProgressSummary,
} from "../lib/api/study";
import {
  HomeLastPosition,
  HomeStudyProgress,
  ProgressSummary,
  UseHomeStudyData,
} from "../types/types";

export const useHomeStudyData = (userId: string): UseHomeStudyData => {
  const [progressSummary, setProgressSummary] =
    useState<ProgressSummary | null>(null);
  const [lastPosition, setLastPosition] = useState<HomeLastPosition | null>(
    null,
  );
  const [lessonProgress, setLessonProgress] =
    useState<HomeStudyProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        setLoading(true);
        const [summary, lastPos] = await Promise.all([
          getProgressSummary(userId),
          getLastPosition(userId),
        ]);

        setProgressSummary(summary);
        setLastPosition(lastPos);

        if (lastPos?.position.lesson_id) {
          const lessonProg = await getLessonProgress(
            userId,
            lastPos.position.lesson_id,
          );
          console.log("Fetched lesson progress:", lessonProg);
          setLessonProgress(lessonProg);
        }
      } catch (err: any) {
        console.error("Failed to fetch home study data:", err);
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return {
    progressSummary,
    lastPosition,
    lessonProgress,
    loading,
    error,
  };
};
