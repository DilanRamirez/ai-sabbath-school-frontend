import { useCallback, useState, KeyboardEvent, useEffect } from "react";
import { SPANISH_BOOK_MAP } from "../lib/utils";
import { BibleReference, fetchBibleReference } from "../lib/api/bible";
import { ChatMessage } from "../components/shared/chat";

/**
 * Custom hook to manage BibleChat state and logic.
 * Handles messages, input state, loading, error, and sending references.
 */
export function useBibleChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageIdCounter, setMessageIdCounter] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputRefText, setInputRefText] = useState<string>("");

  const addMessage = useCallback(
    (sender: "user" | "bot", text: string) => {
      setMessages((prev) => [...prev, { id: messageIdCounter, sender, text }]);
      setMessageIdCounter((prev) => prev + 1);
    },
    [messageIdCounter],
  );

  const sendReference = useCallback(async () => {
    const rawRef = inputRefText.trim();
    if (!rawRef) return;

    // Normalize format "Libro capítulo:versículo" or "Libro capítulo"
    const ref = rawRef.replace(/\s*:\s*/g, ":").replace(/\s*,\s*/g, ", ");

    // Extract the book name (text before the first digit)
    const bookMatch = ref.match(/^(.+?)\s+\d+/);
    const bookName = bookMatch ? bookMatch[1].trim() : "";

    // Lookup the book in SPANISH_BOOK_MAP (case-insensitive)
    const mapEntry = Object.entries(SPANISH_BOOK_MAP).find(
      ([key, value]) =>
        key.toLowerCase() === bookName.toLowerCase() ||
        value.toLowerCase() === bookName.toLowerCase(),
    );
    if (!mapEntry) {
      const bookError = `Libro no reconocido: "${bookName}". Verifica la ortografía.`;
      setError(bookError);
      addMessage("bot", bookError);
      setLoading(false);
      return;
    }
    // Replace the book portion in the reference with the normalized name (value)
    const normalizedBook = mapEntry[1];
    const normalizedRef = ref.replace(
      new RegExp(`^${bookName}`),
      normalizedBook,
    );

    addMessage("user", normalizedRef);
    setInputRefText("");
    setError(null);
    setLoading(true);

    try {
      const data: BibleReference = await fetchBibleReference(normalizedRef);
      let botText = "";
      if (data.text) {
        botText = `${data.book} ${data.chapter}:${data.verse} — ${data.text}`;
      } else if (data.verses) {
        botText = Object.entries(data.verses)
          .map(([v, txt]) => `${data.book} ${data.chapter}:${v} — ${txt}`)
          .join("\n");
      } else {
        botText = "No verses found for that reference.";
      }
      addMessage("bot", botText);
    } catch (err: any) {
      const status = err?.response?.status;
      const userMessage =
        status === 400
          ? "Referencia inválida. Usa el formato: Libro capítulo o Libro capítulo:versículo"
          : err?.response?.data?.detail ||
            err.message ||
            "Error al obtener la cita bíblica.";
      setError(userMessage);
      addMessage("bot", userMessage);
    } finally {
      setLoading(false);
    }
  }, [inputRefText, addMessage]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (
          error ===
          "Referencia inválida. Usa el formato: Libro capítulo o Libro capítulo:versículo"
        ) {
          return;
        }
        sendReference();
      }
    },
    [error, sendReference],
  );

  // Clear error on new input
  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [error, inputRefText]);

  return {
    messages,
    loading,
    error,
    inputRefText,
    setInputRefText,
    sendReference,
    handleKeyDown,
  };
}
