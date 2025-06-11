// src/app/hooks/use-update-study.ts

import { useState, useCallback } from "react";
import { updateStudyProgress } from "../lib/api/study";
import { StudyProgressPayload, StudyProgressResponse } from "../types/types";

interface UseUpdateStudyProgressResult {
  updateProgress: (
    // eslint-disable-next-line no-unused-vars
    payload: StudyProgressPayload
  ) => Promise<StudyProgressResponse | void>;
  isUpdating: boolean;
  error: string | null;
  resetError: () => void;
}

/**
 * Hook for updating study progress with robust state handling.
 */
export function useUpdateStudyProgress(): UseUpdateStudyProgressResult {
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Sends updated study progress to the server.
   * @param payload - The study progress payload to submit.
   */
  const updateProgress = useCallback(
    async (
      payload: StudyProgressPayload
    ): Promise<StudyProgressResponse | void> => {
      // Guard: ensure payload has required fields
      if (!payload.user_id || !payload.lesson_id) {
        setError("Payload missing required user_id or lesson_id");
        return;
      }

      setIsUpdating(true);
      setError(null);

      try {
        const result = await updateStudyProgress(payload);
        // Persist last position locally
        // eslint-disable-next-line no-undef
        localStorage.setItem("lastPosition", JSON.stringify(result));
        return result;
      } catch (err: any) {
        // Surface user-friendly error message
        const message =
          err?.response?.data?.message ||
          err?.message ||
          "Failed to update study progress. Please try again.";
        setError(message);
      } finally {
        setIsUpdating(false);
      }
    },
    []
  );

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  return {
    updateProgress,
    isUpdating,
    error,
    resetError,
  };
}
