import {
  StudyProgressPayload,
  StudyProgressRecord,
  StudyProgressResponse,
} from "@/app/types/types";

export const BASE_URL =
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

  const bodyPayload: any = {
    user_id: safeUserId,
    quarter: payload.quarter,
    lesson_id: payload.lesson_id,
    day: payload.day,
    cohort_id: payload.cohort_id,
    mark_studied: payload.mark_studied,
    content: payload.content,
    question_id: payload.question_id,
    note: payload?.note?.trim() !== "" ? payload.note : null,
  };

  const response = await fetch(`${BASE_URL}/study/progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add authorization here if needed:
      // Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(bodyPayload),
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
