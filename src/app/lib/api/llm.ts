import { LLMRequest, LLMResponse } from "@/app/types/types";
import api from "../api";

export async function callLLM(request: LLMRequest): Promise<LLMResponse> {
  try {
    const { data } = await api.post("/llm", request);
    return data;
  } catch (error: any) {
    return {
      result: {
        answer: "",
        refs: [],
      },
      status: "error",
      error: error.response?.data?.message || error.message,
    };
  }
}
