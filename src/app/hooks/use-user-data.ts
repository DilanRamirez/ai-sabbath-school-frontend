import { useEffect, useState } from "react";
import { getUserStudyData } from "../lib/auth";
import { UserLessonProgress } from "../types/types";

export function useUserStudyData(userId: string) {
  const [data, setData] = useState<UserLessonProgress[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError("Missing user ID");
      setLoading(false);
      return;
    }

    setLoading(true);
    getUserStudyData(userId)
      .then((response) => {
        setData(response);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load user study data:", err.message);
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [userId]);

  return { data, loading, error };
}
