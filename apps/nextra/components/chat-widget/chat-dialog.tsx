import type { ComponentProps } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as ScrollArea from "@radix-ui/react-scroll-area";
import { PenLine, Trash2, X, ChevronLeft, ChevronRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ChatInput } from "./chat-input";
import { ChatMessage } from "./chat-message";
import { ChatSidebar } from "./chat-sidebar";
import type { ChatWidgetProps } from "@aptos-labs/ai-chatbot-client";
import { useState, useRef, useEffect } from "react";
import { cn } from "utils/cn";
import Image from "next/image";
import aptosLogo from "../../public/favicon/favicon.png";

export interface ChatDialogProps extends ChatWidgetProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
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
            <Image src={aptosLogo} alt="Aptos AI" className="h-4 w-4" />
            AskAptos
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
                <Dialog.Title className="flex items-center gap-2 text-lg font-medium text-white">
                  <Image src={aptosLogo} alt="Aptos AI" className="h-5 w-5" />
                  Ask AI
                </Dialog.Title>
                {showSidebar && (
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
            {showSidebar && (
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
                <ScrollArea.Root className="h-full">
                  <ScrollArea.Viewport
                    ref={viewportRef}
                    className="h-full w-full"
                  >
                    <div className="flex flex-col gap-4 p-4">
                      {hasMoreMessages && (
                        <button
                          onClick={onLoadMore}
                          className="mx-auto rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                        >
                          Load more messages
                        </button>
                      )}
                      {messages.map((message, index) => (
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
                      {isTyping && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.2s]" />
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:0.4s]" />
                        </div>
                      )}
                    </div>
                  </ScrollArea.Viewport>
                  <ScrollArea.Scrollbar
                    orientation="vertical"
                    className="flex w-2.5 touch-none select-none bg-transparent p-[2px]"
                  >
                    <ScrollArea.Thumb className="relative flex-1 rounded-full bg-gray-800" />
                  </ScrollArea.Scrollbar>
                </ScrollArea.Root>
              </div>

              {/* Input Area */}
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
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
