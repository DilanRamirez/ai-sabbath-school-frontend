import {
  HomeLastPosition,
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
 * Get a user's progress summary (e.g., days studied, notes written, lessons completed).
 */
export async function getProgressSummary(userId: string) {
  const safeUserId = userId.replace(/@/g, "-at-").replace(/\./g, "-dot-");
  const response = await fetch(
    `${BASE_URL}/study/progress-summary/${safeUserId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch progress summary");
  }

  return response.json();
}

/**
 * Get the user's last accessed lesson/day.
 */
export async function getLastPosition(
  userId: string,
): Promise<HomeLastPosition> {
  const safeUserId = userId.replace(/@/g, "-at-").replace(/\./g, "-dot-");
  const response = await fetch(`${BASE_URL}/study/last-position/${safeUserId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch last position");
  }

  return response.json();
}

/**
 * Get the user's progress for a specific lesson.
 */
export async function getLessonProgress(userId: string, lessonId: string) {
  const safeUserId = userId.replace(/@/g, "-at-").replace(/\./g, "-dot-");
  const response = await fetch(
    `${BASE_URL}/study/progress/${safeUserId}/${lessonId}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch lesson progress");
  }

  return response.json();
}

/**
 * Fetch the metadata.json file for a specific lesson.
 * @param year - Lesson year, e.g. "2025"
 * @param quarter - Quarter slug, e.g. "Q2"
 * @param lessonId - Lesson ID, e.g. "lesson-10"
 */
export async function getLessonMetadata(
  year: string,
  quarter: string,
  lessonId: string,
): Promise<any> {
  const response = await fetch(
    `${BASE_URL}/lessons/${year}/${quarter}/${lessonId}/metadata`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch metadata for ${lessonId}`);
  }

  const metadata = await response.json();
  return metadata;
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
    year: payload.year,
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
