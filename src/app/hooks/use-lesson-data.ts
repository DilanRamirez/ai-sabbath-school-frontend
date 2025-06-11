import { useEffect, useState, useCallback, useRef } from "react";
import { useAppDispatch } from "../store/hooks";
import { getLessons, getQuarters } from "../lib/api/lessons";
import { LessonsResponse, Quarter } from "../types/types";
import {
  loadLessons,
  loadLessonsLoading,
  loadLessonsError,
} from "../store/slices/lessons/lessons-slice";
import {
  loadQuarters,
  loadQuartersLoading,
  loadQuartersError,
} from "../store/slices/quarters/quarters-slice";
import { useParams } from "next/navigation";

interface UseLessonDataResult {
  quarters: Quarter[];
  lessons: LessonsResponse[];
  loading: boolean;
  error: string | null;
  selectedQuarter?: Quarter;
  // eslint-disable-next-line no-unused-vars
  fetchLessons: (quarter: Quarter) => Promise<void>;
}

/**
 * Custom hook to load quarters and lessons data.
 * @param selectedQuarter Optional externally selected quarter.
 */
export function useLessonData(selectedQuarter?: Quarter): UseLessonDataResult {
  const dispatch = useAppDispatch();
  const params = useParams();
  const quarterSlug =
    typeof params?.quarterId === "string" ? params.quarterId : "";

  const [quarters, setQuarters] = useState<Quarter[]>([]);
  const [lessons, setLessons] = useState<LessonsResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const hasFetchedQuarters = useRef(false);
  const fetchedLessons = useRef<Set<string>>(new Set());

  // Fetch quarters on mount
  const fetchQuarters = useCallback(async () => {
    if (hasFetchedQuarters.current) return;
    hasFetchedQuarters.current = true;
    dispatch(loadQuartersLoading());
    setError(null);
    try {
      const data = await getQuarters();
      setQuarters(data);
      dispatch(loadQuarters(data));
    } catch (err: any) {
      console.error("Failed to load quarters:", err);
      const msg = "Error al cargar trimestres";
      setError(msg);
      dispatch(loadQuartersError(msg));
    }
  }, [dispatch]);

  // Fetch lessons for a given quarter
  const fetchLessons = useCallback(
    async (quarter: Quarter) => {
      const quarterKey = `${quarter.metadata.slug}-${quarter.year}`;
      if (fetchedLessons.current.has(quarterKey)) return;
      fetchedLessons.current.add(quarterKey);
      if (!quarter) return;
      dispatch(loadLessonsLoading({ loading: true }));
      setLoading(true);
      setError(null);
      setLessons([]);

      try {
        const data = await getLessons(quarter.year, quarter.metadata.slug);
        setLessons(data);
        dispatch(loadLessons(data));
      } catch (err: any) {
        console.error("Failed to load lessons:", err);
        const msg = "Error al cargar lecciones";
        setError(msg);
        dispatch(loadLessonsError(msg));
      } finally {
        setLoading(false);
        dispatch(loadLessonsLoading({ loading: false }));
      }
    },
    [dispatch],
  );

  // Load quarters on initial render
  useEffect(() => {
    fetchQuarters();
  }, [fetchQuarters]);

  // When an external quarter is selected, load its lessons
  useEffect(() => {
    if (selectedQuarter) {
      fetchLessons(selectedQuarter);
    }
  }, [selectedQuarter, fetchLessons]);

  // If no external quarter, but slug present, map slug to quarter and load
  useEffect(() => {
    if (!selectedQuarter && quarterSlug && quarters.length > 0) {
      const matched = quarters.find((q) => q.metadata.slug === quarterSlug);
      if (matched) {
        fetchLessons(matched);
      }
    }
  }, [selectedQuarter, quarterSlug, quarters, fetchLessons]);

  return {
    quarters,
    lessons,
    loading,
    error,
    selectedQuarter,
    fetchLessons,
  };
}
