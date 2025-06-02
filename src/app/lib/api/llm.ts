import { LLMRequest, LLMResponse } from "@/app/types/types";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function callLLM(request: LLMRequest): Promise<LLMResponse> {
  try {
    const response = await fetch(`${BASE_URL}/llm`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "LLM request failed");
    }

    return response.json();
  } catch (error: any) {
    return {
      result: {
        answer: "",
        refs: [],
      },
      status: "error",
      error: error.message,
    };
  }
}
