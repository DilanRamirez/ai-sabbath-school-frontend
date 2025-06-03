import {
  StudyProgressPayload,
  StudyProgressRecord,
  StudyProgressResponse,
} from "@/app/types/types";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

/**
 * Fetch a user's existing progress for a specific lesson.
 */
export async function getStudyProgress(
  userId: string,
  lessonId: string,
): Promise<StudyProgressRecord> {
  const safeUserId = userId.replace(/@/g, "-at-").replace(/\./g, "-dot-");
  const response = await fetch(
    `${BASE_URL}/study/progress/${encodeURIComponent(
      safeUserId,
    )}/${encodeURIComponent(lessonId)}`,
  );
  if (response.status === 404 || response.status === 500) {
    // Return default if no record exists
    return {
      lesson_id: lessonId,
      days_completed: [],
      notes: [],
      last_accessed: new Date().toISOString(),
      cohort_id: "",
      score: 0,
      quarter: "",
    };
  }

  if (!response.ok) {
    throw new Error(`Error fetching progress: ${response.statusText}`);
  }

  const data: StudyProgressRecord = await response.json();
  console.log("Study progress updated:", data);
  // save in local storage for quick access
  // eslint-disable-next-line no-undef
  localStorage.setItem("studyProgress", JSON.stringify(data));
  return data;
}

/**
 * Send or update the user's study progress for a specific day.
 */
export async function updateStudyProgress(
  payload: StudyProgressPayload,
): Promise<StudyProgressResponse> {
  const safeUserId = payload.user_id
    .replace(/@/g, "-at-")
    .replace(/\./g, "-dot-");
  const response = await fetch(`${BASE_URL}/study/progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add authorization here if needed:
      // Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      ...payload,
      userId: safeUserId,
    }),
  });

  if (!response.ok) {
    const errJson = await response.json().catch(() => null);
    throw new Error(
      errJson?.detail || `Error updating progress: ${response.statusText}`,
    );
  }

  const data: StudyProgressResponse = await response.json();

  return data;
}
