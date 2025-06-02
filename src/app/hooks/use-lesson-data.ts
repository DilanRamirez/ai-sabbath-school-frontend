import { useEffect, useState, useCallback } from "react";
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
import { useRouter, useParams } from "next/navigation";

export function useLessonData(selectedQuarter?: Quarter) {
  const router = useRouter();
  const params = useParams();
  const quarterIdFromUrl =
    typeof params?.quarterId === "string" ? params.quarterId : "";

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

  const onGetLessons = useCallback(
    (selectedQuarter: Quarter) => {
      getLessons(selectedQuarter.year, selectedQuarter.metadata.slug)
        .then((data) => {
          setLessons(data);
          dispatch(loadLessons(data));
          setLoading(false);
          dispatch(loadLessonsLoading({ loading: false }));
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
    },
    [dispatch, router],
  );

  useEffect(() => {
    if (!selectedQuarter) return;
    setLoading(true);
    setLessons([]);
    setError(null);
    dispatch(loadLessonsLoading({ loading: true }));

    onGetLessons(selectedQuarter);
  }, [dispatch, onGetLessons, router, selectedQuarter]);

  useEffect(() => {
    if (!selectedQuarter && quarterIdFromUrl && quarters.length > 0) {
      const match = quarters.find((q) => q.metadata.slug === quarterIdFromUrl);
      if (match) {
        onGetLessons(match);
      }
    }
  }, [selectedQuarter, quarterIdFromUrl, quarters, onGetLessons]);

  return { quarters, lessons, loading, error, selectedQuarter, onGetLessons };
}
