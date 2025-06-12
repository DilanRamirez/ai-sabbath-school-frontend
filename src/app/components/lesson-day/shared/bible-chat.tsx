/* eslint-disable react/display-name */
"use client";

import React, { useState, useCallback, KeyboardEvent, FC } from "react";
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
import { fetchBibleReference, BibleReference } from "@/app/lib/api/bible";

/**
 * Represents a single chat message.
 */
interface ChatMessage {
  id: number;
  sender: "user" | "bot";
  text: string;
}

/**
 * BibleChat component allows users to enter a verse reference,
 * fetches the corresponding text, and displays a simple chat log.
 */
const BibleChat: FC = React.memo(() => {
  const [openChat, setOpenChat] = useState<boolean>(false);
  const [inputRefText, setInputRefText] = useState<string>("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [messageIdCounter, setMessageIdCounter] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const addMessage = useCallback(
    (sender: "user" | "bot", text: string) => {
      setMessages((prev) => [...prev, { id: messageIdCounter, sender, text }]);
      setMessageIdCounter((prev) => prev + 1);
    },
    [messageIdCounter],
  );

  // Handle send action
  const handleSend = async () => {
    const ref = inputRefText.trim();
    if (!ref) return;

    // Add user message
    addMessage("user", ref);
    setInputRefText("");
    setError(null);
    setLoading(true);

    try {
      const data: BibleReference = await fetchBibleReference(ref);
      // Build bot response text
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
      setError(err?.message || "Error fetching verse.");
      addMessage("bot", err?.message || "Error fetching verse.");
    } finally {
      setLoading(false);
    }
  };

  // Send on Enter
  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!openChat) {
    return (
      <IconButton
        color="primary"
        onClick={() => setOpenChat(true)}
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
  }

  return (
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
        sx={{ p: 2, height: 400, display: "flex", flexDirection: "column" }}
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
            onClick={() => setOpenChat(false)}
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
          <List>
            {messages.map((msg, i) => (
              <ListItem
                key={i}
                sx={{
                  justifyContent:
                    msg.sender === "user" ? "flex-end" : "flex-start",
                }}
              >
                <Box
                  sx={{
                    bgcolor:
                      msg.sender === "user" ? "primary.main" : "grey.300",
                    color:
                      msg.sender === "user"
                        ? "primary.contrastText"
                        : "text.primary",
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
        </Box>

        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            fullWidth
            multiline
            minRows={1}
            maxRows={4}
            placeholder="Enter verse reference (e.g., 'Juan 3:16')"
            value={inputRefText}
            onChange={(e) => setInputRefText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
          />
          <IconButton
            color="primary"
            onClick={handleSend}
            disabled={loading || !inputRefText.trim()}
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
      </Paper>
    </Box>
  );
});

export default BibleChat;
