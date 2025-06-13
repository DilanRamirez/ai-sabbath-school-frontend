/* eslint-disable react/display-name */
"use client";

import React, {
  useState,
  useCallback,
  KeyboardEvent,
  FC,
  useMemo,
  useEffect,
  memo,
} from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Typography,
  List,
  ListItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchBibleReference, BibleReference } from "@/app/lib/api/bible";
import { SPANISH_BOOK_MAP } from "@/app/lib/utils";

const BOOK_OPTIONS = Array.from(
  new Set(Object.values(SPANISH_BOOK_MAP)),
).sort();

/**
 * Represents a single chat message.
 */
interface ChatMessage {
  id: number;
  sender: "user" | "bot";
  text: string;
}

/**
 * Custom hook to manage BibleChat state and logic.
 * Handles messages, input state, loading, error, and sending references.
 */
function useBibleChat() {
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

/**
 * Floating button to toggle the Bible chat window.
 */
const ChatToggleButton: FC<{ onClick: () => void }> = ({ onClick }) => (
  <IconButton
    color="primary"
    onClick={onClick}
    sx={{
      position: "fixed",
      bottom: 16,
      right: 16,
      bgcolor: "background.paper",
      boxShadow: 3,
    }}
    aria-label="Open Bible chat"
  >
    <ChatIcon />
  </IconButton>
);

/**
 * Memoized component to render the list of chat messages.
 */
const MessageList = memo(({ messages }: { messages: ChatMessage[] }) => (
  <List role="log" aria-live="polite" aria-relevant="additions">
    {messages.map((msg) => (
      <ListItem
        key={msg.id}
        sx={{
          justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
        }}
      >
        <Box
          sx={{
            bgcolor: msg.sender === "user" ? "primary.main" : "grey.300",
            color:
              msg.sender === "user" ? "primary.contrastText" : "text.primary",
            borderRadius: 2,
            p: 1,
            maxWidth: "75%",
            whiteSpace: "pre-line",
          }}
        >
          <Typography variant="body2">{msg.text}</Typography>
        </Box>
      </ListItem>
    ))}
  </List>
));

/**
 * Memoized component for the input area with Autocomplete and Send button.
 */
const MessageInput = memo(
  ({
    inputRefText,
    setInputRefText,
    loading,
    error,
    sendReference,
    handleKeyDown,
  }: {
    inputRefText: string;
    setInputRefText: React.Dispatch<React.SetStateAction<string>>;
    loading: boolean;
    error: string | null;
    sendReference: () => void;
    // eslint-disable-next-line no-unused-vars
    handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
  }) => {
    const disabledSend = useMemo(
      () =>
        loading ||
        !inputRefText.trim() ||
        error ===
          "Referencia inválida. Usa el formato: Libro capítulo o Libro capítulo:versículo",
      [loading, inputRefText, error],
    );

    return (
      <>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Autocomplete
            freeSolo
            options={BOOK_OPTIONS}
            inputValue={inputRefText}
            onInputChange={(_, value) => setInputRefText(value)}
            disabled={loading}
            sx={{ flexGrow: 1 }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder="Libro capítulo[:versículo] (e.g., Juan 3:16 o Génesis 1)"
                onKeyDown={handleKeyDown}
                aria-label="Verse reference input"
              />
            )}
          />
          <IconButton
            color="primary"
            onClick={sendReference}
            disabled={disabledSend}
            aria-label="Send verse reference"
          >
            <SendIcon />
          </IconButton>
        </Box>
        {error && (
          <Typography variant="caption" color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}
      </>
    );
  },
);

/**
 * The main chat window component containing header, messages, and input.
 */
const ChatWindow: FC<{
  onClose: () => void;
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  inputRefText: string;
  setInputRefText: React.Dispatch<React.SetStateAction<string>>;
  sendReference: () => void;
  // eslint-disable-next-line no-unused-vars
  handleKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}> = ({
  onClose,
  messages,
  loading,
  error,
  inputRefText,
  setInputRefText,
  sendReference,
  handleKeyDown,
}) => (
  <Box
    sx={{
      position: "fixed",
      bottom: 16,
      right: 16,
      width: 360,
      zIndex: 1300,
    }}
  >
    <Paper
      elevation={2}
      sx={{ p: 2, height: 500, display: "flex", flexDirection: "column" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Bible Chat</Typography>
        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Close Bible chat"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: 1,
          p: 1,
          my: 2,
          backgroundColor: "#fafafa",
        }}
      >
        <MessageList messages={messages} />
      </Box>
      <MessageInput
        inputRefText={inputRefText}
        setInputRefText={setInputRefText}
        loading={loading}
        error={error}
        sendReference={sendReference}
        handleKeyDown={handleKeyDown}
      />
    </Paper>
  </Box>
);

/**
 * BibleChat component allows users to enter a verse reference,
 * fetches the corresponding text, and displays a simple chat log.
 */
const BibleChat: FC = React.memo(() => {
  const [openChat, setOpenChat] = useState<boolean>(false);
  const {
    messages,
    loading,
    error,
    inputRefText,
    setInputRefText,
    sendReference,
    handleKeyDown,
  } = useBibleChat();

  if (!openChat) {
    return <ChatToggleButton onClick={() => setOpenChat(true)} />;
  }

  return (
    <ChatWindow
      onClose={() => setOpenChat(false)}
      messages={messages}
      loading={loading}
      error={error}
      inputRefText={inputRefText}
      setInputRefText={setInputRefText}
      sendReference={sendReference}
      handleKeyDown={handleKeyDown}
    />
  );
});

export default BibleChat;
