import { useState } from "react";
import {
  ChatbotProvider,
  useChatbot,
  RagProvider,
} from "@aptos-labs/ai-chatbot-client";
import { ChatDialog } from "./chat-dialog";

function ChatDialogContainer() {
  const {
    messages = [],
    sendMessage,
    isLoading = false,
    isGenerating = false,
    isTyping = false,
    hasMoreMessages = false,
    fastMode = false,
    chats = [],
    currentChatId,
    stopGenerating,
    loadPreviousMessages,
    copyMessage,
    provideFeedback,
    createNewChat,
    selectChat,
    deleteChat,
    updateChatTitle,
    setFastMode,
  } = useChatbot();

  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (message: string) => {
    try {
      await sendMessage(message);
    } catch (error: any) {
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <>
      <ChatDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
        isGenerating={isGenerating}
        isTyping={isTyping}
        hasMoreMessages={hasMoreMessages}
        fastMode={fastMode}
        showSidebar={true}
        onStopGenerating={stopGenerating}
        onLoadMore={loadPreviousMessages}
        onCopyMessage={copyMessage}
        onMessageFeedback={provideFeedback}
        onNewChat={createNewChat}
        chats={chats}
        currentChatId={currentChatId || undefined}
        onSelectChat={selectChat}
        onDeleteChat={deleteChat}
        onUpdateChatTitle={updateChatTitle}
        onToggleFastMode={setFastMode}
      />
      {error && (
        <div className="fixed bottom-4 right-4 rounded-lg bg-red-500 px-4 py-2 text-white">
          {error}
        </div>
      )}
    </>
  );
}

export function ChatWidget() {
  return (
    <ChatbotProvider
      config={{
        apiKey: process.env.NEXT_PUBLIC_CHATBOT_API_KEY || "",
        apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
        ragProvider: RagProvider.DEVELOPER_DOCS,
      }}
    >
      <ChatDialogContainer />
    </ChatbotProvider>
  );
}
