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
  const response = await fetch(
    `${BASE_URL}/study/progress/${encodeURIComponent(
      userId,
    )}/${encodeURIComponent(lessonId)}`,
  );

  if (response.status === 404) {
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
  return data;
}

/**
 * Send or update the user's study progress for a specific day.
 */
export async function updateStudyProgress(
  payload: StudyProgressPayload,
): Promise<StudyProgressResponse> {
  const response = await fetch(`${BASE_URL}/study/progress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Add authorization here if needed:
      // Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errJson = await response.json().catch(() => null);
    throw new Error(
      errJson?.detail || `Error updating progress: ${response.statusText}`,
    );
  }

  const data: StudyProgressResponse = await response.json();
  console.log("Updated progress:", data);
  return data;
}
