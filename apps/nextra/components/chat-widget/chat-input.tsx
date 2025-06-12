import * as React from "react";
import { ArrowRight, StopCircle } from "lucide-react";
import { cn } from "utils/cn";

export interface ChatInputProps {
  onSend: (message: string) => void;
  onStop?: () => void;
  isLoading?: boolean;
  className?: string;
}

const ChatInput = React.forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ onSend, onStop, isLoading, className }, ref) => {
    const [message, setMessage] = React.useState("");
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      const trimmedMessage = message.trim();
      if (trimmedMessage) {
        onSend(trimmedMessage);
        setMessage("");
        if (textareaRef.current) {
          textareaRef.current.style.height = "auto";
        }
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSubmit(e);
      }
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setMessage(e.target.value);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        const maxHeight = 120; // Maximum height before scrolling
        const newHeight = Math.min(textareaRef.current.scrollHeight, maxHeight);
        textareaRef.current.style.height = `${newHeight}px`;
      }
    };

    return (
      <form
        onSubmit={handleSubmit}
        className={cn("flex h-full items-center gap-2", className)}
      >
        <div className="relative flex-1">
          <textarea
            ref={ref || textareaRef}
            value={message}
            onChange={handleInput}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Aptos and Move"
            rows={1}
            className={cn(
              "w-full resize-none rounded-lg bg-[#1F1F1F] px-4 py-3",
              "text-sm text-white placeholder-gray-500",
              "focus:outline-none focus:ring-1 focus:ring-gray-500",
            )}
            style={{
              minHeight: "2.5rem",
              maxHeight: "7.5rem",
            }}
          />
        </div>
        {isLoading ? (
          <button
            type="button"
            onClick={onStop}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0F0F0F] text-gray-400 hover:text-white"
          >
            <StopCircle className="h-5 w-5" />
          </button>
        ) : (
          <button
            type="submit"
            disabled={!message.trim()}
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center",
              message.trim()
                ? "text-white hover:text-blue-400 transition-colors"
                : "text-gray-600",
            )}
          >
            <ArrowRight className="h-5 w-5" />
          </button>
        )}
      </form>
    );
  },
);

ChatInput.displayName = "ChatInput";

export { ChatInput };
