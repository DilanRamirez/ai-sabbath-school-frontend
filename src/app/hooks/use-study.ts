import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { StudyProgressPayload, StudyProgressRecord } from "../types/types";
import { getStudyProgress, updateStudyProgress } from "../lib/api/study";

interface UseStudyProgressProps {
  userId: string;
  year: string; // e.g. "2025"
  quarterSlug: string;
  lessonId: string;
  dayName: string;
  cohortId: string;
  question_id?: string; // Optional question ID for specific questions
}

export function useStudyProgress({
  userId,
  year, // e.g. "2025"
  quarterSlug,
  lessonId,
  dayName,
  cohortId,
  question_id,
}: UseStudyProgressProps) {
  const [progress, setProgress] = useState<StudyProgressRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hasValidParams = useMemo(() => {
    return Boolean(userId && quarterSlug && lessonId && dayName && cohortId);
  }, [userId, quarterSlug, lessonId, dayName, cohortId]);

  const lastSyncTimeRef = useRef<number>(0);

  /**
   * Loads the study progress for the current user and lesson.
   */
  const loadProgress = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!hasValidParams) {
      setError("Missing required parameters");
      setLoading(false);
      return;
    }

    try {
      const fetchedProgress = await getStudyProgress(userId, lessonId);
      setProgress(fetchedProgress);
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 500 || status === 404) {
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
        setError(err.message || "Unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  }, [userId, quarterSlug, lessonId, cohortId, hasValidParams]);

  /**
   * Synchronizes the study progress with the server.
   * Debounced to prevent excessive calls within 500ms.
   * @param payload The study progress payload to update.
   */
  const syncProgress = useCallback(
    async (payload: StudyProgressPayload) => {
      const now = Date.now();
      if (now - lastSyncTimeRef.current < 500) {
        return;
      }
      lastSyncTimeRef.current = now;

      if (!hasValidParams) {
        return;
      }

      try {
        const updated = await updateStudyProgress(payload);
        // eslint-disable-next-line no-undef
        localStorage.setItem("lastPosition", JSON.stringify(updated));
        const fetchedProgress = await getStudyProgress(userId, lessonId);
        setProgress(fetchedProgress);
      } catch (err: any) {
        setError(err.message || "Unexpected error occurred");
      }
    },
    [userId, lessonId, hasValidParams],
  );

  /**
   * Marks the current day as studied.
   */
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
      year: year,
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
    year,
  ]);

  /**
   * Clears the current error state.
   */
  const resetError = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    if (hasValidParams) {
      loadProgress();
    }
  }, [hasValidParams, loadProgress]);

  return {
    progress,
    loading,
    error,
    refetch: syncProgress,
    markDayAsStudied,
    resetError,
  };
}
