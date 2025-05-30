import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getLessons, getQuarters } from "../lib/api/lessons";
import {
  loadQuartersLoading,
  loadQuarters,
  loadQuartersError,
} from "../store/slices/quarters/quarters-slice";
import { Quarter } from "../types/types";

export interface Lesson {
  lesson_id: string;
  title: string;
  week_range: string;
  memory_verse: string;
}

export function useLessonData(selectedQuarter?: Quarter) {
  const dispatch = useDispatch();
  const [quarters, setQuarters] = useState<Quarter[]>([]);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(loadQuartersLoading());
    getQuarters()
      .then((data) => {
        console.log("Loaded quarters:", data);
        setQuarters(data);
        dispatch(loadQuarters(data));
      })
      .catch((err) => {
        console.error(err);
        setError("Error loading quarters");
        dispatch(loadQuartersError("Error loading quarters"));
      });
  }, []);

  useEffect(() => {
    if (!selectedQuarter) return;
    setLoading(true);
    setLessons([]);
    setError(null);

    getLessons(selectedQuarter.year, selectedQuarter.metadata.slug)
      .then(setLessons)
      .catch((err) => {
        console.error(err);
        setError("Error loading lessons");
      })
      .finally(() => setLoading(false));
  }, [selectedQuarter]);

  return { quarters, lessons, loading, error };
}
