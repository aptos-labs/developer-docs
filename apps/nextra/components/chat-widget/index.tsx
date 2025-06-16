import { useState, useEffect } from "react";
import {
  ChatbotProvider,
  useChatbot,
  RagProvider,
} from "@aptos-labs/ai-chatbot-client";
import { ChatDialog } from "./chat-dialog";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../../lib/firebase";

const googleProvider = new GoogleAuthProvider();

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
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isRateLimited, setIsRateLimited] = useState(false);

  useEffect(() => {
    if (!auth) return;
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (user) {
        setIsRateLimited(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignInOrOut = async () => {
    if (!auth) return;
    if (user) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Error signing out:", error);
        setError("Failed to sign out");
      }
    } else {
      setIsAuthenticating(true);
      setError(null);
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (error) {
        console.error("Error signing in:", error);
        setError("Failed to sign in with Google");
      } finally {
        setIsAuthenticating(false);
      }
    }
  };

  const handleSendMessage = async (message: string) => {
    try {
      await sendMessage(message);
    } catch (error: any) {
      if (error?.response?.status === 429) {
        setIsRateLimited(true);
        setError("Rate limit exceeded. Please sign in to continue.");
      } else {
        setError("Failed to send message. Please try again.");
      }
    }
  };

  return (
    <>
      <ChatDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading || isAuthenticating}
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
        user={user}
        onSignOut={handleSignInOrOut}
        isRateLimited={isRateLimited}
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
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!auth) return;
    // Check if user is already signed in
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          // Get token from your API
          const idToken = await user.getIdToken();
          setToken(idToken);
        } catch (error) {
          console.error("Error getting token:", error);
        }
      } else {
        setToken(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <ChatbotProvider
      config={{
        apiKey: token || "",
        apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080",
        ragProvider: RagProvider.DEVELOPER_DOCS,
      }}
    >
      <ChatDialogContainer />
    </ChatbotProvider>
  );
}
