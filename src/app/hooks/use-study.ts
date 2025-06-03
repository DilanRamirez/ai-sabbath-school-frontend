import { useEffect, useState, useCallback } from "react";
import { StudyProgressPayload, StudyProgressRecord } from "../types/types";
import { getStudyProgress, updateStudyProgress } from "../lib/api/study";

interface UseStudyProgressProps {
  userId: string;
  quarterSlug: string;
  lessonId: string;
  dayName: string;
  cohortId: string;
  question_id?: string; // Optional question ID for specific questions
}

export function useStudyProgress({
  userId,
  quarterSlug,
  lessonId,
  dayName,
  cohortId,
  question_id,
}: UseStudyProgressProps) {
  const [progress, setProgress] = useState<StudyProgressRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const initialFetchProgress = useCallback(async () => {
    const hasParams = userId && quarterSlug && lessonId && dayName && cohortId;

    if (!hasParams) {
      setError("Missing required parameters");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const fetchedProgress = await getStudyProgress(userId, lessonId);
      setProgress(fetchedProgress);
      console.log("Initial study progress fetched:", fetchedProgress);
    } catch (err: any) {
      const isNotFound =
        err.message?.includes("500") ||
        err.message?.includes("Internal Server Error") ||
        err.message?.includes("404");
      if (isNotFound) {
        setProgress({
          lesson_id: lessonId,
          days_completed: [],
          notes: [],
          last_accessed: new Date().toISOString(),
          cohort_id: cohortId,
          score: 0,
          quarter: quarterSlug,
        });
      } else {
        console.error("Initial fetch error:", err);
        setError(err.message || "Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [userId, quarterSlug, lessonId, dayName, cohortId]);

  const syncProgress = useCallback(
    async (payload: StudyProgressPayload) => {
      const hasParams =
        userId && quarterSlug && lessonId && dayName && cohortId;
      if (!hasParams) {
        console.warn("Missing required parameters for syncProgress", {
          userId,
          quarterSlug,
          lessonId,
          dayName,
          cohortId,
        });
        return;
      }

      try {
        const updated = await updateStudyProgress(payload);
        console.log("Study progress updated:", updated);
        // eslint-disable-next-line no-undef
        localStorage.setItem("lastPosition", JSON.stringify(updated));
        const fetchedProgress = await getStudyProgress(userId, lessonId);
        setProgress(fetchedProgress);
      } catch (err) {
        console.error("Study progress error:", err);
        setError((err as Error).message || "Unexpected error occurred");
      }
    },
    [userId, quarterSlug, lessonId, dayName, cohortId],
  );

  const markDayAsStudied = useCallback(() => {
    const payload: StudyProgressPayload = {
      user_id: userId,
      quarter: quarterSlug,
      lesson_id: lessonId,
      day: dayName,
      cohort_id: cohortId,
      mark_studied: true,
      question_id: question_id || "",
      content: "", // Optional content, can be empty
    };
    syncProgress(payload);
  }, [
    userId,
    quarterSlug,
    lessonId,
    dayName,
    cohortId,
    question_id,
    syncProgress,
  ]);

  useEffect(() => {
    if (userId && quarterSlug && lessonId && dayName && cohortId) {
      initialFetchProgress();
    }
  }, [userId, quarterSlug, lessonId, dayName, cohortId, initialFetchProgress]);

  return {
    progress,
    loading,
    error,
    refetch: syncProgress,
    markDayAsStudied,
  };
}
