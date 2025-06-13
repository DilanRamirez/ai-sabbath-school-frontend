import {
  HomeLastPosition,
  StudyProgressPayload,
  StudyProgressRecord,
  StudyProgressResponse,
} from "@/app/types/types";
import api from "../api";

/**
 * Fetch a user's existing progress for a specific lesson.
 */
export async function getStudyProgress(
  userId: string,
  lessonId: string,
): Promise<StudyProgressRecord> {
  const safeUserId = userId.replace(/@/g, "-at-").replace(/\./g, "-dot-");
  const { data } = await api.get<StudyProgressRecord>(
    `/study/progress/${encodeURIComponent(safeUserId)}/${encodeURIComponent(
      lessonId,
    )}`,
  );
  // eslint-disable-next-line no-undef
  localStorage.setItem("studyProgress", JSON.stringify(data));
  return data;
}

/**
 * Get a user's progress summary (e.g., days studied, notes written, lessons completed).
 */
export async function getProgressSummary(userId: string) {
  const safeUserId = userId.replace(/@/g, "-at-").replace(/\./g, "-dot-");
  const { data } = await api.get(`/study/progress-summary/${safeUserId}`);
  return data;
}

/**
 * Get the user's last accessed lesson/day.
 */
export async function getLastPosition(
  userId: string,
): Promise<HomeLastPosition> {
  const safeUserId = userId.replace(/@/g, "-at-").replace(/\./g, "-dot-");
  const { data } = await api.get<HomeLastPosition>(
    `/study/last-position/${safeUserId}`,
  );
  return data;
}

/**
 * Get the user's progress for a specific lesson.
 */
export async function getLessonProgress(userId: string, lessonId: string) {
  const safeUserId = userId.replace(/@/g, "-at-").replace(/\./g, "-dot-");
  const { data } = await api.get(`/study/progress/${safeUserId}/${lessonId}`);
  return data;
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
  const { data } = await api.get(
    `/lessons/${year}/${quarter}/${lessonId}/metadata`,
  );
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
    year: payload.year,
    day: payload.day,
    cohort_id: payload.cohort_id,
    mark_studied: payload.mark_studied,
    content: payload.content,
    question_id: payload.question_id,
    note: payload?.note?.trim() !== "" ? payload.note : null,
  };

  const { data } = await api.post<StudyProgressResponse>(
    "/study/progress",
    bodyPayload,
  );
  return data;
}
