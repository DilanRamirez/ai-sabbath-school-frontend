import axios from "axios";

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;

const bible_api = axios.create({
  baseURL: "https://bible-api.com",
});

export { bible_api };

// New LLM API function

/**
 * Send a question to the LLM endpoint and return the generated response.
 * @param request - QARequest containing question, top_k, lang, and mode
 * @returns LLMResponse from the server
 */
export async function fetchLLMAnswer(request: any): Promise<any> {
  try {
    const response = await api.post<any>("/llm/answer", request);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching LLM answer:", error);
    throw error;
  }
}

/**
 * Call the LLM `/llm/answer` endpoint with the given text and mode.
 * @param text The paragraph or question to send.
 * @param mode The LLM mode: "explain" | "reflect" | "apply" | "summarize" | "ask".
 * @param topK How many context fragments to retrieve (default 3).
 * @param lang Language code, "es" or "en" (default "es").
 * @returns The generated response string, or an empty string on error.
 */
export async function getLLMResponse(
  text: string,
  mode: any = "explain",
  topK = 3,
  lang: "es" | "en" = "es",
): Promise<any> {
  const request: any = {
    question: text,
    mode,
    top_k: topK,
    lang,
  };

  try {
    const data: any = await fetchLLMAnswer(request);
    return data || "";
  } catch (err) {
    console.error("LLM request failed:", err);
    return {} as any;
  }
}
