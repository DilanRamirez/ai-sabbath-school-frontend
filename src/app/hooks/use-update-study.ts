// src/app/hooks/use-update-study.ts

import { updateStudyProgress } from "../lib/api/study";
import { StudyProgressPayload, StudyProgressResponse } from "../types/types";

/**
 * A simplified hook to only update study progress.
 * Use this in components that just need to submit progress/notes, not fetch full records.
 */
export function useUpdateStudyProgress() {
  const update = async (
    payload: StudyProgressPayload,
  ): Promise<StudyProgressResponse> => {
    try {
      const result = await updateStudyProgress(payload);
      // eslint-disable-next-line no-undef
      localStorage.setItem("lastPosition", JSON.stringify(result));
      return result;
    } catch (err: any) {
      console.error("Failed to update study progress:", err);
      throw err;
    }
  };

  return { update };
}
