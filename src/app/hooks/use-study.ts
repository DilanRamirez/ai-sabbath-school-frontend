import { useEffect, useState, useCallback } from "react";
import { StudyProgressPayload, StudyProgressRecord } from "../types/types";
import { getStudyProgress, updateStudyProgress } from "../lib/api/study";

interface UseStudyProgressProps {
  userId: string;
  quarterSlug: string;
  lessonId: string;
  dayName: string;
  cohortId: string;
}

export function useStudyProgress({
  userId,
  quarterSlug,
  lessonId,
  dayName,
  cohortId,
}: UseStudyProgressProps) {
  const [progress, setProgress] = useState<StudyProgressRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const isValidParams = useCallback(() => {
    return !!(userId && quarterSlug && lessonId && dayName && cohortId);
  }, [userId, quarterSlug, lessonId, dayName, cohortId]);

  const syncProgress = useCallback(
    async (payload: StudyProgressPayload) => {
      try {
        setLoading(true);
        setError(null);

        const updated = await updateStudyProgress(payload);
        // eslint-disable-next-line no-undef
        localStorage.setItem(
          "lastPosition",
          JSON.stringify(updated.last_position),
        );

        const fetchedProgress = await getStudyProgress(userId, lessonId);
        setProgress(fetchedProgress);
      } catch (err) {
        console.error("Study progress error:", err);
        setError((err as Error).message || "Unexpected error occurred");
      } finally {
        setLoading(false);
      }
    },
    [userId, lessonId],
  );

  const markDayAsStudied = useCallback(() => {
    if (!isValidParams()) {
      console.warn("Missing required parameters for markDayAsStudied");
      return;
    }

    const payload: StudyProgressPayload = {
      user_id: userId,
      quarter: quarterSlug,
      lesson_id: lessonId,
      day: dayName,
      cohort_id: cohortId,
      mark_studied: true,
    };
    syncProgress(payload);
  }, [
    userId,
    quarterSlug,
    lessonId,
    dayName,
    cohortId,
    isValidParams,
    syncProgress,
  ]);

  useEffect(() => {
    if (!isValidParams()) {
      setError("Missing required parameters");
      setLoading(false);
      return;
    }

    const payload: StudyProgressPayload = {
      user_id: userId,
      quarter: quarterSlug,
      lesson_id: lessonId,
      day: dayName,
      cohort_id: cohortId,
      mark_studied: false,
    };

    syncProgress(payload);
  }, [
    cohortId,
    dayName,
    isValidParams,
    lessonId,
    quarterSlug,
    syncProgress,
    userId,
  ]);

  return {
    progress,
    loading,
    error,
    refetch: syncProgress,
    markDayAsStudied,
  };
}
