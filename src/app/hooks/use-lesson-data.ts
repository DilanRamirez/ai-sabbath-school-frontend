import { useEffect, useState, useCallback, useRef, useMemo } from "react";
import { useAppDispatch } from "../store/hooks";
import { getLessons, getQuarters } from "../lib/api/lessons";
import type { LessonsResponse, Quarter } from "../types/types";
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

// Hook to fetch quarters once
function useFetchQuarters(): {
  quarters: Quarter[];
  loading: boolean;
  error: string | null;
} {
  const dispatch = useAppDispatch();
  const [quarters, setQuarters] = useState<Quarter[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const hasFetched = useRef(false);

  const fetch = useCallback(async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    setLoading(true);
    dispatch(loadQuartersLoading());
    try {
      const data = await getQuarters();
      setQuarters(data);
      dispatch(loadQuarters(data));
    } catch {
      const msg = "Error al cargar trimestres";
      setError(msg);
      dispatch(loadQuartersError(msg));
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { quarters, loading, error };
}

// Hook to fetch lessons per quarter with caching
function useFetchLessons(): {
  lessons: LessonsResponse[];
  loading: boolean;
  error: string | null;
  // eslint-disable-next-line no-unused-vars
  fetchLessons: (quarter: Quarter) => Promise<void>;
} {
  const dispatch = useAppDispatch();
  const [lessons, setLessons] = useState<LessonsResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cache = useRef<Record<string, boolean>>({});

  const fetchLessons = useCallback(
    async (quarter: Quarter) => {
      if (!quarter) return;
      const key = `${quarter.metadata.slug}-${quarter.year}`;
      if (cache.current[key]) return;
      cache.current[key] = true;
      setLoading(true);
      dispatch(loadLessonsLoading({ loading: true }));
      try {
        const data = await getLessons(quarter.year, quarter.metadata.slug);
        setLessons(data);
        dispatch(loadLessons(data));
      } catch {
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

  return { lessons, loading, error, fetchLessons };
}

// Main hook combining both
export function useLessonData(externalQuarter?: Quarter): UseLessonDataResult {
  const { quarters, loading: qLoading, error: qError } = useFetchQuarters();
  const {
    lessons,
    loading: lLoading,
    error: lError,
    fetchLessons,
  } = useFetchLessons();
  const params = useParams();
  const slug = typeof params?.quarterId === "string" ? params.quarterId : "";

  // Determine the selected quarter: external prop or URL slug match
  const selectedQuarter = useMemo<Quarter | undefined>(() => {
    if (externalQuarter) return externalQuarter;
    if (slug && quarters.length) {
      return quarters.find((q) => q.metadata.slug === slug);
    }
    return undefined;
  }, [externalQuarter, slug, quarters]);

  // Trigger lesson fetch when selected quarter changes
  useEffect(() => {
    if (selectedQuarter) {
      fetchLessons(selectedQuarter);
    }
  }, [selectedQuarter, fetchLessons]);

  // Consolidated loading and error states
  const loading = qLoading || lLoading;
  const error = qError || lError;

  return {
    quarters,
    lessons,
    loading,
    error,
    selectedQuarter,
    fetchLessons,
  };
}
