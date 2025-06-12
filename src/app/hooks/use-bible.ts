import { useState, useEffect, useCallback, useRef } from "react";
import debounce from "lodash/debounce";
import { fetchBibleReference, BibleReference } from "../lib/api/bible";

/**
 * Custom hook to fetch Bible verses or verse ranges.
 * Returns a trigger function to fetch a Bible reference.
 * @returns An object with { data, loading, error, fetchReference }
 */
export function useBibleReference() {
  // State for fetched data, loading status, and errors
  const [data, setData] = useState<BibleReference | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Ref to store the latest requested reference
  const latestRef = useRef<string>("");

  // Debounced fetch function to batch rapid calls
  const debouncedFetch = useRef(
    debounce(async (ref: string) => {
      try {
        const result = await fetchBibleReference(ref);
        setData(result);
      } catch (err: any) {
        setError(
          err?.response?.data?.detail ??
            err.message ??
            "Error fetching Bible reference",
        );
      } finally {
        setLoading(false);
      }
    }, 300),
  ).current;

  /**
   * Trigger a fetch for the given Bible reference.
   * Input is validated and then debounced.
   */
  const fetchReference = useCallback(
    (ref: string) => {
      if (!ref || typeof ref !== "string") {
        setError("Invalid scripture reference"); // Guard clause
        return;
      }
      // Reset previous state
      setError(null);
      setData(null);
      setLoading(true);

      latestRef.current = ref;
      debouncedFetch(ref);
    },
    [debouncedFetch],
  );

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedFetch.cancel();
    };
  }, [debouncedFetch]);

  return { data, loading, error, fetchReference };
}
