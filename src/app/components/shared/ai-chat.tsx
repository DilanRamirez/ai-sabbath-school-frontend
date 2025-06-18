import React from "react";
import { useState, FC } from "react";
import { ChatToggleButton, ChatWindow } from "./chat";
import { useAiChat } from "@/app/hooks/use-ai-chat";

/** Main AI chat component wiring the hook and UI parts */
interface AiChatProps {
  text: string;
}
const AiChat: FC<AiChatProps> = ({ text }) => {
  const [open, setOpen] = useState(false);
  const {
    messages,
    loading,
    error,
    inputRefText,
    setInputRefText,
    sendReference,
    handleKeyDown,
  } = useAiChat();

  const toggleOpen = () => setOpen((o) => !o);

  return open ? (
    <ChatWindow
      onClose={toggleOpen}
      messages={messages}
      loading={loading}
      error={error}
      inputValue={inputRefText}
      setInputValue={setInputRefText}
      onSend={() => sendReference(inputRefText + text)}
      onKeyDown={handleKeyDown}
      title="Sabbath+ Chat"
    />
  ) : (
    <ChatToggleButton
      onClick={toggleOpen}
      style={{
        position: "fixed",
        bottom: 10,
        left: 106,
        backgroundColor: "background.paper",
      }}
    />
  );
};

export default AiChat;
