import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLessons, getQuarters } from "../lib/api/lessons";
import {
  loadQuartersLoading,
  loadQuarters,
  loadQuartersError,
} from "../store/slices/quarters/quarters-slice";
import { LessonsResponse, Quarter } from "../types/types";
import {
  loadLessons,
  loadLessonsError,
  loadLessonsLoading,
} from "../store/slices/lessons/lessons-slice";
import { useRouter } from "next/navigation";

export function useLessonData(selectedQuarter?: Quarter) {
  const router = useRouter();

  const dispatch = useDispatch();
  const [quarters, setQuarters] = useState<Quarter[]>([]);
  const [lessons, setLessons] = useState<LessonsResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadQuartersLoading());
    getQuarters()
      .then((data) => {
        setQuarters(data);
        dispatch(loadQuarters(data));
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading quarters");
        dispatch(loadQuartersError("Error loading quarters"));
      });
  }, [dispatch]);

  useEffect(() => {
    if (!selectedQuarter) return;
    setLoading(true);
    setLessons([]);
    setError(null);
    dispatch(loadLessonsLoading({ loading: true }));

    getLessons(selectedQuarter.year, selectedQuarter.metadata.slug)
      .then((data) => {
        setLessons(data);
        dispatch(loadLessons(data));
        setLoading(false);
        dispatch(loadLessonsLoading({ loading: false }));
        router.push(`/quarters/${selectedQuarter.metadata.slug}/lessons`);
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading lessons");
        dispatch(loadLessons([]));
        dispatch(loadLessonsError("Error loading lessons"));
        setLoading(false);
        dispatch(loadLessonsLoading({ loading: false }));
      })
      .finally(() => setLoading(false));
  }, [dispatch, router, selectedQuarter]);

  return { quarters, lessons, loading, error };
}
