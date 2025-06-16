import { useState, useCallback } from "react";
import { LastPosition, User } from "../types/types";
import { getReport } from "../lib/api/study";
import { mapNotesToDays } from "../lib/utils";

export function useReport(lastPosition: LastPosition | undefined, user: User) {
  const [report, setReport] = useState<any>(null);
  const [mappedDays, setMappedDays] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { year, quarter, lesson_id } = lastPosition || {};
  const userId = user?.email || "";

  const fetchReport = useCallback(async () => {
    if (!year || !quarter || !lesson_id || !userId) return;
    setLoading(true);
    setError(null);
    try {
      const data = await getReport(year, quarter, lesson_id, userId);
      if (!data) {
        throw new Error("No report data found");
      }
      const mapped = mapNotesToDays(data.aiSummaries, data.userProgress.notes);

      setMappedDays(mapped);
      setReport(data);
    } catch (err: any) {
      setError(err.message || "Error fetching report");
    } finally {
      setLoading(false);
    }
  }, [year, quarter, lesson_id, userId]);

  return { report, mappedDays, loading, error, refetch: fetchReport };
}
