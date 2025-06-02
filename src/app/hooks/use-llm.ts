import { useState } from "react";
import { LLMMode } from "../types/types";
import { callLLM } from "../lib/api/llm";

type LLMResponsePayload = {
  answer: string;
  refs?: string[];
};

type LLMResponses = {
  // eslint-disable-next-line no-unused-vars
  [key in LLMMode]?: LLMResponsePayload;
};

export function useLLM() {
  const [loading, setLoading] = useState(false);
  const [responses, setResponses] = useState<LLMResponses>({});
  const [error, setError] = useState<string | null>(null);

  const getLLMResponse = async (mode: LLMMode, context: string) => {
    setLoading(true);
    setError(null);

    try {
      const response = await callLLM({ text: context, mode, lang: "es" });

      if (response.result) {
        setResponses((prev) => ({ ...prev, [mode]: response.result }));
      } else {
        setError("Unexpected response format");
      }
    } catch (err: any) {
      console.error("LLM API error:", err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return { getLLMResponse, loading, responses, error };
}
