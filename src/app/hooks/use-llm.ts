import { useState, useCallback } from "react";
import { LLMMode } from "../types/types";
import { callLLM } from "../lib/api/llm";

interface LLMResult {
  answer: string;
  refs?: string[];
}

type LLMResultsMap = Record<LLMMode, LLMResult | undefined>;

/**
 * Custom hook for interacting with the LLM API.
 * Provides loading state, result map by mode, and error handling.
 */
export function useLLM() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<LLMResultsMap>({} as LLMResultsMap);
  const [error, setError] = useState<string | null>(null);

  /**
   * Fetches the LLM response for a given mode and context.
   * @param mode - LLMMode determines the prompt/behavior.
   * @param context - Input text for the LLM.
   */
  const fetchLLMResult = useCallback(async (mode: LLMMode, context: string) => {
    // Guard: non-empty context
    if (!context || !context.trim()) {
      setError("Input context cannot be empty.");
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const { result } = await callLLM({
        text: context.trim(),
        mode,
        lang: "es",
      });
      if (!result || typeof result.answer !== "string") {
        throw new Error("Unexpected response format from LLM.");
      }
      // Append or replace result for this mode
      setResults((prev) => ({ ...prev, [mode]: result }));
    } catch (err: any) {
      console.error("LLM API error:", err);
      setError(
        err.message || "An unexpected error occurred while calling LLM.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    fetchLLMResult,
    isLoading,
    results,
    error,
  };
}
