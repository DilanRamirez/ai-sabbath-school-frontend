"use client";

import { useState, useCallback, KeyboardEvent } from "react";
import { ChatMessage } from "../components/shared/chat";
import { useLLM } from "./use-llm";
import { LLMMode } from "../types/types";

/**
 * Custom hook for Bible/chat interactions using LLM.
 */
export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputRefText, setInputRefText] = useState<string>("");

  // LLM hook providing fetchLLMResult, loading state, results, and error
  const { fetchLLMResult, isLoading, results, error } = useLLM();

  /**
   * Sends the current input to the LLM and updates message history.
   */
  const sendReference = useCallback(
    async (text: string) => {
      const trimmedText = text.trim();
      if (!trimmedText) return;

      // Add user message
      const userMsg: ChatMessage = {
        id: Date.now(),
        sender: "user",
        text: trimmedText,
      };
      setMessages((prev) => [...prev, userMsg]);
      setInputRefText("");

      try {
        // Call LLM with user input and full conversation
        const reply = await fetchLLMResult(LLMMode.ASK, trimmedText);

        // Add assistant message
        const botMsg: ChatMessage = {
          id: Date.now() + 1,
          sender: "bot",
          text: String(reply),
        };
        setMessages((prev) => [...prev, botMsg]);
      } catch (e) {
        // Handle and display LLM errors
        const errMsg: ChatMessage = {
          id: Date.now() + 2,
          sender: "bot",
          text: `Error: ${(e as Error).message}`,
        };
        setMessages((prev) => [...prev, errMsg]);
      }
    },
    [fetchLLMResult],
  );

  /**
   * Handles Enter key to send message.
   */
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendReference("");
      }
    },
    [sendReference],
  );

  // Expose state and handlers to UI components
  return {
    messages,
    loading: isLoading,
    error,
    inputRefText,
    setInputRefText,
    sendReference,
    handleKeyDown,
    results,
  };
}
