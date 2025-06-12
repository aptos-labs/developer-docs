import type { ComponentProps } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import {
  PenLine,
  Trash2,
  X,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";
import { ChatSidebar } from "./chat-sidebar";
import type { ChatWidgetProps } from "@aptos-labs/ai-chatbot-client";
import { useState, useRef, useEffect } from "react";
import { cn } from "utils/cn";

export interface ChatDialogProps extends ChatWidgetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
  user?: {
    displayName?: string | null;
    email?: string | null;
    photoURL?: string | null;
  } | null;
  onSignOut?: () => void;
}

const IconComponent = ({
  icon: Icon,
  ...props
}: { icon: LucideIcon } & ComponentProps<"svg">) => {
  return <Icon {...props} />;
};

export function ChatDialog({
  open,
  onOpenChange,
  messages = [],
  isLoading,
  isGenerating,
  isTyping,
  hasMoreMessages,
  onSendMessage,
  onStopGenerating,
  onLoadMore,
  onCopyMessage,
  onMessageFeedback,
  onNewChat,
  className,
  messageClassName,
  fastMode,
  showSidebar = true,
  showTrigger = true,
  chats = [],
  currentChatId,
  onSelectChat,
  onDeleteChat,
  onUpdateChatTitle,
  onToggleFastMode,
  user,
  onSignOut,
}: ChatDialogProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeoutId);
  }, [messages, isTyping]);

  const handleNewChat = () => {
    onNewChat?.();
    setTimeout(() => {
      chatInputRef.current?.focus();
    }, 100);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {showTrigger && (
        <Dialog.Trigger asChild>
          <button className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-text-link">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
              />
            </svg>
            Chat with AI
          </button>
        </Dialog.Trigger>
      )}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[99999] bg-black/80 data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out" />
        <Dialog.Content
          className={cn(
            "fixed z-[100000] flex flex-col overflow-hidden rounded-xl bg-[#0F0F0F] shadow-xl",
            "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
            "h-[85vh] w-[85vw] max-w-[1200px]",
            "data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out",
            className,
          )}
          style={
            {
              "--header-height": "3.5rem",
              "--footer-height": "4.5rem",
            } as React.CSSProperties
          }
          aria-describedby="dialog-description"
        >
          {/* Header */}
          <div
            className="flex shrink-0 items-center justify-between border-b border-[#1F1F1F] px-4"
            style={{ height: "var(--header-height)" }}
          >
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Dialog.Title className="text-lg font-medium text-white">
                  Ask AI
                </Dialog.Title>
                {showSidebar && user && (
                  <button
                    onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                    className="rounded p-1 text-gray-400 hover:bg-[#1F1F1F] hover:text-white"
                  >
                    <IconComponent
                      icon={isSidebarCollapsed ? ChevronRight : ChevronLeft}
                      className="h-4 w-4"
                    />
                  </button>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4">
              {user ? (
                <>
                  <div className="flex items-center gap-3 border-r border-[#1F1F1F] pr-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-300">
                        {user.displayName || user.email}
                      </span>
                    </div>
                    {onSignOut && (
                      <button
                        onClick={onSignOut}
                        className="rounded p-1.5 text-gray-400 hover:bg-[#1F1F1F] hover:text-white"
                        title="Sign out"
                      >
                        <IconComponent icon={LogOut} className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <button
                    onClick={handleNewChat}
                    className="rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-black hover:bg-gray-100"
                  >
                    <div className="flex items-center gap-2">
                      <IconComponent icon={PenLine} className="h-4 w-4" />
                      New chat
                    </div>
                  </button>
                  {currentChatId && (
                    <button
                      onClick={() => onDeleteChat?.(currentChatId)}
                      className="rounded p-2 text-gray-400 hover:bg-[#1F1F1F] hover:text-white"
                    >
                      <IconComponent icon={Trash2} className="h-5 w-5" />
                    </button>
                  )}
                </>
              ) : null}
              <Dialog.Close className="rounded p-2 text-gray-400 hover:bg-[#1F1F1F] hover:text-white">
                <IconComponent icon={X} className="h-5 w-5" />
              </Dialog.Close>
            </div>
          </div>

          <Dialog.Description id="dialog-description" className="sr-only">
            Chat interface for interacting with Aptos AI assistant. Use this
            dialog to ask questions and get responses from the AI.
          </Dialog.Description>

          {/* Main Content */}
          <div className="flex min-h-0 flex-1">
            {/* Sidebar */}
            {showSidebar && user && (
              <ChatSidebar
                chats={chats}
                currentChatId={currentChatId || undefined}
                onSelectChat={onSelectChat}
                onDeleteChat={onDeleteChat}
                onUpdateChatTitle={onUpdateChatTitle}
                onNewChat={onNewChat}
                fastMode={fastMode}
                onToggleFastMode={onToggleFastMode}
                isCollapsed={isSidebarCollapsed}
                className="shrink-0 transition-all duration-200"
              />
            )}

            {/* Chat Area */}
            <div className="flex min-h-0 flex-1 flex-col bg-black">
              {/* Messages Area */}
              <div className="min-h-0 flex-1 overflow-hidden">
                {!user ? (
                  <div className="flex h-full items-center justify-center">
                    <div className="text-center">
                      <h2 className="mb-4 text-xl font-semibold text-white">
                        Sign in to Start Chatting
                      </h2>
                      <button
                        onClick={onSignOut}
                        className="rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                      >
                        Sign in with Google
                      </button>
                    </div>
                  </div>
                ) : (
                  <ScrollArea.Root className="h-full">
                    <ScrollArea.Viewport
                      ref={viewportRef}
                      className="h-full w-full"
                    >
                      <div className="flex flex-col gap-4 p-4">
                        {hasMoreMessages && (
                          <button
                            onClick={onLoadMore}
                            className="text-sm text-gray-400 hover:text-white"
                          >
                            Load more
                          </button>
                        )}
                        {messages.map((message) => (
                          <ChatMessage
                            key={message.id}
                            message={message}
                            onCopy={() => onCopyMessage?.(message.id)}
                            onFeedback={(feedback) =>
                              onMessageFeedback?.(message.id, feedback)
                            }
                            className={messageClassName}
                          />
                        ))}
                        {(isLoading || isTyping) && (
                          <div className="flex items-center text-gray-400">
                            <div className="animate-pulse">...</div>
                          </div>
                        )}
                      </div>
                    </ScrollArea.Viewport>
                    <ScrollArea.Scrollbar orientation="vertical">
                      <ScrollArea.Thumb className="z-50 w-1.5 rounded-full bg-gray-700" />
                    </ScrollArea.Scrollbar>
                  </ScrollArea.Root>
                )}
              </div>

              {/* Input Area */}
              {user && (
                <div
                  className="shrink-0 border-t border-[#1F1F1F] bg-[#0F0F0F] px-4"
                  style={{ height: "var(--footer-height)" }}
                >
                  <ChatInput
                    ref={chatInputRef}
                    onSend={onSendMessage}
                    onStop={onStopGenerating}
                    isLoading={isGenerating}
                    className="h-full py-3"
                  />
                </div>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
