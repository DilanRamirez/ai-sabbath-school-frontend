import { useState, useEffect, useRef } from "react";
import { getUserStudyData } from "../lib/auth";
import { UserLessonProgress } from "../types/types";

interface UseUserStudyDataResult {
  data: UserLessonProgress[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * Custom hook to fetch and manage user study data.
 * @param userId - The ID of the user whose data to load.
 */
export function useUserStudyData(userId: string): UseUserStudyDataResult {
  const [data, setData] = useState<UserLessonProgress[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(true);

  const fetchData = async () => {
    if (!userId) {
      setError("Missing user ID");
      setData(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await getUserStudyData(userId);
      if (!isMounted.current) return;
      if (!Array.isArray(response)) {
        throw new Error("Invalid response format");
      }
      setData(response);
    } catch (err: any) {
      if (!isMounted.current) return;
      console.error("Error loading user study data:", err);
      setError(err.message || "Failed to load study data");
      setData(null);
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    return () => {
      isMounted.current = false;
    };
  }, [userId]);

  return { data, loading, error, refetch: fetchData };
}
