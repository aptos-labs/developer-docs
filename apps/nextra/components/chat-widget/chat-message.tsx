import * as Tooltip from "@radix-ui/react-tooltip";
import { Copy, ThumbsUp, ThumbsDown, User } from "lucide-react";
import type { Message } from "@aptos-labs/ai-chatbot-client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import aptosLogo from "../../public/favicon/favicon.png";
import { cn } from "utils/cn";

export interface ChatMessageProps {
  message: Message;
  onCopy?: () => void;
  onFeedback?: (feedback: "positive" | "negative") => void;
  className?: string;
}

export function ChatMessage({
  message,
  onCopy,
  onFeedback,
  className,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex items-start gap-4 rounded-lg p-4",
        isUser ? "bg-gray-900" : "bg-black",
        className,
      )}
    >
      {isUser ? (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
          <User className="h-4 w-4 text-white" />
        </div>
      ) : (
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white">
          <Image src={aptosLogo} alt="Aptos AI" className="h-5 w-5" />
        </div>
      )}

      <div className="flex-1 space-y-2">
        <div className="prose prose-invert max-w-none text-white">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ className, children }) {
                const match = /language-(\w+)/.exec(className || "");
                return (
                  <pre
                    className={cn(
                      "rounded-lg bg-gray-800 p-4 text-white",
                      match && `language-${match[1]}`,
                    )}
                  >
                    <code className={cn("text-white", className)}>
                      {children}
                    </code>
                  </pre>
                );
              },
              p: ({ children }) => <p className="text-white">{children}</p>,
              li: ({ children }) => <li className="text-white">{children}</li>,
              a: ({ children, href }) => (
                <a href={href} className="text-blue-400 hover:text-blue-300">
                  {children}
                </a>
              ),
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {!isUser && (
          <div className="flex items-center gap-4">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger>
                  <button
                    onClick={() => onCopy?.()}
                    className="text-gray-400 hover:text-white"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="rounded bg-gray-900 px-2 py-1 text-xs text-white"
                    sideOffset={5}
                  >
                    Copy to clipboard
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>

              <Tooltip.Root>
                <Tooltip.Trigger>
                  <button
                    onClick={() => onFeedback?.("positive")}
                    className={cn(
                      "text-gray-400 hover:text-green-500",
                      message.feedback === "positive" && "text-green-500",
                    )}
                  >
                    <ThumbsUp className="h-4 w-4" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="rounded bg-gray-900 px-2 py-1 text-xs text-white"
                    sideOffset={5}
                  >
                    Helpful
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>

              <Tooltip.Root>
                <Tooltip.Trigger>
                  <button
                    onClick={() => onFeedback?.("negative")}
                    className={cn(
                      "text-gray-400 hover:text-red-500",
                      message.feedback === "negative" && "text-red-500",
                    )}
                  >
                    <ThumbsDown className="h-4 w-4" />
                  </button>
                </Tooltip.Trigger>
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="rounded bg-gray-900 px-2 py-1 text-xs text-white"
                    sideOffset={5}
                  >
                    Not helpful
                  </Tooltip.Content>
                </Tooltip.Portal>
              </Tooltip.Root>
            </Tooltip.Provider>
          </div>
        )}
      </div>
    </div>
  );
}
