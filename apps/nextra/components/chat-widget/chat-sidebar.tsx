import * as React from "react";
import {
  Root as ScrollAreaRoot,
  Viewport,
  Scrollbar,
  Thumb,
} from "@radix-ui/react-scroll-area";
import { MessageCircle, Pencil, Trash2 } from "lucide-react";
import type { Chat } from "@aptos-labs/ai-chatbot-client";
import { cn } from "utils/cn";

export interface ChatSidebarProps {
  chats?: Chat[];
  currentChatId?: string;
  onSelectChat?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
  onUpdateChatTitle?: (chatId: string, title: string) => void;
  onNewChat?: () => void;
  fastMode?: boolean;
  onToggleFastMode?: (enabled: boolean) => void;
  className?: string;
  isCollapsed?: boolean;
  style?: React.CSSProperties;
}

interface GroupedChats {
  today: Chat[];
  previous: Chat[];
}

const groupChatsByDate = (chats: Chat[]): GroupedChats => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  return chats.reduce<GroupedChats>(
    (groups, chat) => {
      const chatDate = new Date(chat.timestamp);
      if (chatDate >= today) {
        groups.today.push(chat);
      } else if (chatDate >= thirtyDaysAgo) {
        groups.previous.push(chat);
      }
      return groups;
    },
    { today: [], previous: [] },
  );
};

const ChatList = ({
  chats,
  currentChatId,
  editingChatId,
  editingTitle,
  isCollapsed,
  onSelectChat,
  onDeleteChat,
  handleEditStart,
  handleKeyDown,
  setEditingTitle,
}: {
  chats: Chat[];
  currentChatId?: string | null;
  editingChatId: string | null;
  editingTitle: string;
  isCollapsed: boolean;
  onSelectChat?: (chatId: string) => void;
  onDeleteChat?: (chatId: string) => void;
  handleEditStart: (chat: Chat) => void;
  handleKeyDown: (e: React.KeyboardEvent) => void;
  setEditingTitle: (title: string) => void;
}) => (
  <>
    {chats.map((chat) => (
      <div
        key={chat.id}
        className={cn(
          "group relative flex items-center gap-3 px-4 py-3",
          "hover:bg-[#1F1F1F]",
          currentChatId === chat.id && "bg-[#1F1F1F]",
        )}
      >
        {React.createElement(MessageCircle, {
          className: "h-4 w-4 flex-shrink-0 text-gray-400",
        })}
        {!isCollapsed && (
          <>
            {editingChatId === chat.id ? (
              <input
                type="text"
                value={editingTitle}
                onChange={(e) => setEditingTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent text-sm text-white focus:outline-none"
                autoFocus
              />
            ) : (
              <button
                onClick={() => {
                  if (chat.id) onSelectChat?.(chat.id);
                }}
                className="flex-1 truncate text-left text-sm text-gray-300"
              >
                {chat.title}
              </button>
            )}
            <div className="absolute right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100">
              <button
                onClick={() => handleEditStart(chat)}
                className="rounded p-1 text-gray-500 hover:text-gray-300"
              >
                {React.createElement(Pencil, { className: "h-3.5 w-3.5" })}
              </button>
              <button
                onClick={() => {
                  if (chat.id) onDeleteChat?.(chat.id);
                }}
                className="rounded p-1 text-gray-500 hover:text-gray-300"
              >
                {React.createElement(Trash2, { className: "h-3.5 w-3.5" })}
              </button>
            </div>
          </>
        )}
      </div>
    ))}
  </>
);

export function ChatSidebar({
  chats = [],
  currentChatId,
  onSelectChat,
  onDeleteChat,
  onUpdateChatTitle,
  fastMode = false,
  onToggleFastMode,
  className,
  isCollapsed = false,
  style,
}: ChatSidebarProps) {
  const [editingChatId, setEditingChatId] = React.useState<string | null>(null);
  const [editingTitle, setEditingTitle] = React.useState("");

  const groupedChats = React.useMemo(() => groupChatsByDate(chats), [chats]);

  const handleEditStart = (chat: Chat) => {
    setEditingChatId(chat.id);
    setEditingTitle(chat.title);
  };

  const handleEditSave = () => {
    if (editingChatId && editingTitle.trim() && onUpdateChatTitle) {
      onUpdateChatTitle(editingChatId, editingTitle.trim());
    }
    setEditingChatId(null);
  };

  const handleEditCancel = () => {
    setEditingChatId(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  return (
    <div
      className={cn(
        "flex h-full flex-col border-r border-[#1F1F1F] transition-all duration-200 shrink-0",
        isCollapsed ? "w-12" : "w-[260px]",
        className,
      )}
    >
      <ScrollAreaRoot className="flex-1">
        <Viewport className="h-full">
          <div className="space-y-2">
            {!isCollapsed && groupedChats.today.length > 0 && (
              <div className="px-4 py-2">
                <h2 className="text-xs font-medium uppercase text-gray-400">
                  Today
                </h2>
              </div>
            )}
            <ChatList
              chats={groupedChats.today}
              currentChatId={currentChatId}
              editingChatId={editingChatId}
              editingTitle={editingTitle}
              isCollapsed={isCollapsed}
              onSelectChat={onSelectChat}
              onDeleteChat={onDeleteChat}
              handleEditStart={handleEditStart}
              handleKeyDown={handleKeyDown}
              setEditingTitle={setEditingTitle}
            />

            {!isCollapsed && groupedChats.previous.length > 0 && (
              <div className="px-4 py-2">
                <h2 className="text-xs font-medium uppercase text-gray-400">
                  Previous 30 Days
                </h2>
              </div>
            )}
            <ChatList
              chats={groupedChats.previous}
              currentChatId={currentChatId}
              editingChatId={editingChatId}
              editingTitle={editingTitle}
              isCollapsed={isCollapsed}
              onSelectChat={onSelectChat}
              onDeleteChat={onDeleteChat}
              handleEditStart={handleEditStart}
              handleKeyDown={handleKeyDown}
              setEditingTitle={setEditingTitle}
            />
          </div>
        </Viewport>
        <Scrollbar orientation="vertical">
          <Thumb className="z-50 w-1.5 rounded-full bg-gray-700" />
        </Scrollbar>
      </ScrollAreaRoot>

      <div className="border-t border-[#1F1F1F] p-4">
        {!isCollapsed && (
          <div className="rounded-lg bg-[#1F1F1F] p-3">
            <label className="flex items-center gap-2 text-sm text-gray-400">
              <input
                type="checkbox"
                checked={fastMode}
                onChange={(e) => onToggleFastMode?.(e.target.checked)}
                className="rounded border-[#2F2F2F] bg-[#2F2F2F] text-blue-500"
              />
              Fast mode
            </label>
            <p className="mt-1 text-xs text-gray-500">
              Might provide less accurate answers
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
