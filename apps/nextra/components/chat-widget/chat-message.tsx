import * as Tooltip from "@radix-ui/react-tooltip";
import { Copy, ThumbsUp, ThumbsDown, User } from "lucide-react";
import type { Message } from "@aptos-labs/ai-chatbot-client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import aptosLogo from "../../public/favicon/favicon.png";
import { cn } from "utils/cn";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

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
        "flex w-full items-start gap-4 p-6 font-['Satoshi']",
        isUser ? "bg-black" : "bg-gray-900",
        className,
      )}
    >
      {isUser ? (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-blue-600">
          <User className="h-4 w-4 text-white" />
        </div>
      ) : (
        <div className="flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-full bg-white">
          <Image src={aptosLogo} alt="Aptos AI" className="h-5 w-5" />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-2 overflow-hidden">
        <div className="prose prose-invert max-w-none break-words text-gray-100">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code(props) {
                const { children, className } = props;
                // @ts-ignore - inline is actually available in the props
                const isInline = props.inline;

                if (isInline) {
                  return (
                    <code className="rounded bg-gray-800 px-1.5 py-0.5 text-sm text-gray-100 font-mono">
                      {children}
                    </code>
                  );
                }

                const match = /language-(\w+)/.exec(className || "");
                const lang = match ? match[1] : "";

                return (
                  <div className="relative !mt-4 max-w-full">
                    <div className="absolute right-2 top-2 z-10">
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(children as string);
                        }}
                        className="rounded bg-gray-700/50 p-1.5 text-gray-400 transition-colors hover:bg-gray-700 hover:text-white"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="max-w-full overflow-x-auto">
                      <SyntaxHighlighter
                        language={lang}
                        style={oneDark}
                        customStyle={{
                          margin: 0,
                          borderRadius: "0.5rem",
                          padding: "1rem",
                          backgroundColor: "rgb(31 41 55)",
                        }}
                        codeTagProps={{
                          className: "font-mono text-sm",
                        }}
                        wrapLongLines={true}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    </div>
                  </div>
                );
              },
              p({ children }) {
                return (
                  <p className="mb-4 text-gray-100 text-[0.9375rem] leading-[1.625] font-normal last:mb-0 break-words">
                    {children}
                  </p>
                );
              },
              ul({ children }) {
                return (
                  <ul className="mb-4 list-disc pl-4 text-gray-100 text-[0.9375rem] leading-[1.625] last:mb-0">
                    {children}
                  </ul>
                );
              },
              ol({ children }) {
                return (
                  <ol className="mb-4 list-decimal pl-4 text-gray-100 text-[0.9375rem] leading-[1.625] last:mb-0">
                    {children}
                  </ol>
                );
              },
              li({ children }) {
                return (
                  <li className="mb-1 text-gray-100 text-[0.9375rem] leading-[1.625] last:mb-0">
                    {children}
                  </li>
                );
              },
              table({ children }) {
                return (
                  <div className="my-4 w-full overflow-x-auto">
                    <table className="w-full border-collapse text-left text-gray-100 text-[0.9375rem]">
                      {children}
                    </table>
                  </div>
                );
              },
              th({ children }) {
                return (
                  <th className="border border-gray-600 bg-gray-800 px-4 py-2 text-left text-gray-100 font-semibold">
                    {children}
                  </th>
                );
              },
              td({ children }) {
                return (
                  <td className="border border-gray-600 px-4 py-2 text-gray-100 whitespace-normal break-words">
                    {children}
                  </td>
                );
              },
              a({ children, href }) {
                return (
                  <a
                    href={href}
                    className="text-blue-400 hover:text-blue-300 font-medium break-words"
                  >
                    {children}
                  </a>
                );
              },
              h1({ children }) {
                return (
                  <h1 className="mt-6 mb-4 text-2xl font-semibold text-gray-100 break-words">
                    {children}
                  </h1>
                );
              },
              h2({ children }) {
                return (
                  <h2 className="mt-6 mb-4 text-xl font-semibold text-gray-100 break-words">
                    {children}
                  </h2>
                );
              },
              h3({ children }) {
                return (
                  <h3 className="mt-6 mb-4 text-lg font-semibold text-gray-100 break-words">
                    {children}
                  </h3>
                );
              },
            }}
          >
            {message.content}
          </ReactMarkdown>
        </div>

        {!isUser && (
          <div className="flex items-center gap-4 pt-2">
            <Tooltip.Provider>
              <Tooltip.Root>
                <Tooltip.Trigger asChild>
                  <button
                    onClick={() => onCopy?.()}
                    className="rounded p-1 text-gray-400 transition-colors hover:bg-[#1F1F1F] hover:text-white"
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
                <Tooltip.Trigger asChild>
                  <button
                    onClick={() => onFeedback?.("positive")}
                    className={cn(
                      "rounded p-1 text-gray-400 transition-colors hover:bg-[#1F1F1F] hover:text-green-500",
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
                <Tooltip.Trigger asChild>
                  <button
                    onClick={() => onFeedback?.("negative")}
                    className={cn(
                      "rounded p-1 text-gray-400 transition-colors hover:bg-[#1F1F1F] hover:text-red-500",
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
