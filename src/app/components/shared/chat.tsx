/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
"use client";

import React, { KeyboardEvent, FC, useEffect, memo, useRef } from "react";
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

/** Represents a single chat message. */
export interface ChatMessage {
  id: number;
  sender: "user" | "bot";
  text: string;
}

/** Floating button to toggle the chat window. */
export const ChatToggleButton: FC<{
  onClick: () => void;
  style?: React.CSSProperties;
}> = ({ onClick, style }) => (
  <IconButton
    color="primary"
    onClick={onClick}
    sx={{
      ...style,
    }}
    aria-label="Open Bible chat"
  >
    <ChatIcon />
  </IconButton>
);

/** Renders the list of chat messages. */
export const MessageList: FC<{ messages: ChatMessage[] }> = memo(
  ({ messages }) => (
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
  ),
);

/** Input area with book autocomplete and send button. */
export const MessageInput: FC<{
  inputValue: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  loading: boolean;
  error: string | null;
  onSend: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}> = memo(
  ({ inputValue, setInputValue, loading, error, onSend, onKeyDown }) => {
    const disableSend = loading || !inputValue.trim();

    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          fullWidth
          multiline
          maxRows={4}
          placeholder="Escribe tu mensaje..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={loading}
        />
        <IconButton
          color="primary"
          onClick={onSend}
          disabled={disableSend}
          aria-label="Send message"
        >
          <SendIcon />
        </IconButton>
        {error && (
          <Typography variant="caption" color="error" sx={{ mt: 1, ml: 1 }}>
            {error}
          </Typography>
        )}
      </Box>
    );
  },
);

/** Chat window container with header, messages and input. */
export const ChatWindow: FC<{
  onClose: () => void;
  messages: ChatMessage[];
  loading: boolean;
  error: string | null;
  inputValue: string;
  title: string;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  onSend: () => void;
  onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void;
}> = ({
  onClose,
  messages,
  loading,
  error,
  title,
  inputValue,
  setInputValue,
  onSend,
  onKeyDown,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <Paper
      elevation={3}
      sx={{
        position: "fixed",
        bottom: 16,
        right: 16,
        width: 360,
        height: 500,
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.paper",
        zIndex: 1300,
        p: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 1,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <IconButton
          size="small"
          onClick={onClose}
          aria-label="Close Bible chat"
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>
      <Box
        ref={containerRef}
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
      <Box sx={{ p: 2 }}>
        <MessageInput
          inputValue={inputValue}
          setInputValue={setInputValue}
          loading={loading}
          error={error}
          onSend={onSend}
          onKeyDown={onKeyDown}
        />
      </Box>
    </Paper>
  );
};
