export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: number;
  feedback?: "positive" | "negative";
}

export interface Chat {
  id: string;
  title: string;
  timestamp: number;
  lastMessage?: string;
  messages: Message[];
}

export interface ChatWidgetProps {
  messages?: Message[];
  isLoading?: boolean;
  isGenerating?: boolean;
  isTyping?: boolean;
  hasMoreMessages?: boolean;
  onSendMessage?: (message: string) => void;
  onStopGenerating?: () => void;
  onLoadMore?: () => void;
  onCopyMessage?: (messageId: string) => void;
  onMessageFeedback?: (
    messageId: string,
    feedback: "positive" | "negative",
  ) => void;
  onNewChat?: () => void;
  className?: string;
  messageClassName?: string;
  fastMode?: boolean;
  showSidebar?: boolean;
  chats?: Chat[];
  currentChatId?: string;
  onSelectChat?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
  onUpdateChatTitle?: (chatId: string, title: string) => void;
  onToggleFastMode?: (enabled: boolean) => void;
}
