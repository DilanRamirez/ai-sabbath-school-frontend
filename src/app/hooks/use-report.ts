import { useFetchQuarters, useFetchLessons } from "./use-lesson-data";
import type { Quarter, LessonsResponse } from "../types/types";

export interface UseReportData {
  quarters: Quarter[];
  lessons: LessonsResponse[];
  loading: boolean;
  error: string | null;
  // eslint-disable-next-line no-unused-vars
  fetchLessons: (quarter: Quarter) => Promise<void>;
}

/**
 * Hook to load available quarters and lessons for report filters.
 */
export function useReportData(): UseReportData {
  const {
    quarters,
    loading: quartersLoading,
    error: quartersError,
  } = useFetchQuarters();
  const {
    lessons,
    loading: lessonsLoading,
    error: lessonsError,
    fetchLessons,
  } = useFetchLessons();

  // Combined loading and error states
  const loading = quartersLoading || lessonsLoading;
  const error = quartersError || lessonsError;

  return {
    quarters,
    lessons,
    loading,
    error,
    fetchLessons,
  };
}
