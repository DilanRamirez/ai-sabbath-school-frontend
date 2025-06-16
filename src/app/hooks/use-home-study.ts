import { useEffect, useState, useCallback } from "react";
import {
  getLastPosition,
  getLessonProgress,
  getProgressSummary,
} from "../lib/api/study";
import {
  HomeLastPosition,
  HomeStudyProgress,
  ProgressSummary,
  UseHomeStudyData,
} from "../types/types";
import { useAppDispatch } from "../store/hooks";
import {
  setRecordsLoading,
  setProgressSummary as setSummaryAction,
  setLastPosition as setLastPositionAction,
  setLessonProgress as setLessonProgressAction,
  setRecordsError,
} from "../store/slices/user/user-slice";
import {
  setLessonAction,
  setLessonErrorAction,
  setLessonLoadingAction,
} from "../store/slices/lesson/lesson-slice";

/**
 * Custom hook to load and manage the user's home study data:
 * - Progress summary
 * - Last accessed position
 * - Detailed lesson progress
 */
export const useHomeStudyData = (userId: string): UseHomeStudyData => {
  const dispatch = useAppDispatch();

  // Local state for immediate UI feedback
  const [progressSummary, setProgressSummary] =
    useState<ProgressSummary | null>(null);
  const [lastPosition, setLastPosition] = useState<HomeLastPosition | null>(
    null
  );
  const [lessonProgress, setLessonProgress] =
    useState<HomeStudyProgress | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetch summary, position, and lesson progress.
   * Uses Promise.all for summary + position, then conditional detailed fetch.
   */
  const fetchData = useCallback(async () => {
    // Guard: no user ID provided
    if (!userId) {
      const msg = "Usuario no proporcionado";
      setError(msg);
      dispatch(setRecordsError(msg));
      dispatch(setRecordsLoading(false));
      setLoading(false);
      return;
    }

    // Reset prior error and signal loading
    setError(null);
    dispatch(setRecordsLoading(true));
    setLoading(true);

    try {
      // Parallel fetch for summary and last position
      const [summaryResult, positionResult] = await Promise.all([
        getProgressSummary(userId),
        getLastPosition(userId),
      ]);

      // Update summary
      setProgressSummary(summaryResult);
      dispatch(setSummaryAction(summaryResult));

      // Update last position
      setLastPosition(positionResult);
      dispatch(setLastPositionAction(positionResult));
      dispatch(setLessonAction(positionResult?.position));

      // Conditional fetch for detailed lesson progress
      const lessonId = positionResult?.position.lesson_id;
      if (lessonId) {
        const lessonResult = await getLessonProgress(userId, lessonId);
        setLessonProgress(lessonResult);
        dispatch(setLessonProgressAction(lessonResult));
      } else {
        // Clear any stale lesson progress
        setLessonProgress(null);
        dispatch(setLessonProgressAction(null));
      }
    } catch (err: any) {
      const msg = err?.message ?? "Error desconocido al cargar datos";
      setError(msg);
      dispatch(setRecordsError(msg));
      dispatch(setLessonErrorAction(msg));
    } finally {
      // Clear loading states
      setLoading(false);
      dispatch(setRecordsLoading(false));
      dispatch(setLessonLoadingAction(false));
    }
  }, [
    userId,
    dispatch,
    setProgressSummary,
    setLastPosition,
    setLessonProgress,
  ]);

  // Trigger fetch when userId changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    progressSummary,
    lastPosition,
    lessonProgress,
    loading,
    error,
  };
};
