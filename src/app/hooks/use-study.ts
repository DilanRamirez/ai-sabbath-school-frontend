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

  const fetchProgress = useCallback(() => {
    const payload: StudyProgressPayload = {
      user_id: userId,
      quarter: quarterSlug,
      lesson_id: lessonId,
      day: dayName,
      cohort_id: cohortId,
      mark_studied: true,
    };

    setLoading(true);
    setError(null);

    updateStudyProgress(payload)
      .then((resp) => {
        // eslint-disable-next-line no-undef
        localStorage.setItem(
          "lastPosition",
          JSON.stringify(resp.last_position),
        );
        return getStudyProgress(userId, lessonId);
      })
      .then((record) => setProgress(record))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [userId, quarterSlug, lessonId, dayName, cohortId]);

  useEffect(() => {
    fetchProgress();
  }, [fetchProgress]);

  return { progress, loading, error, refetch: fetchProgress };
}
