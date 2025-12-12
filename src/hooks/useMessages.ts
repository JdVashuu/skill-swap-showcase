import { useState, useEffect, useCallback } from "react";
import { Message, Conversation } from "@/types/message";
import { dummyConversations, dummyMessages } from "@/data/dummyMessages";
import { api } from "@/lib/api";

interface UseMessagesResult {
  conversations: Conversation[];
  messages: Message[];
  activeConversation: Conversation | null;
  isLoading: boolean;
  error: Error | null;
  setActiveConversationId: (id: string) => void;
  sendMessage: (content: string) => Promise<void>;
  refetch: () => void;
}

export const useMessages = (): UseMessagesResult => {
  const [conversations, setConversations] = useState<Conversation[]>(dummyConversations);
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string>(dummyConversations[0]?.id || "");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;

  const loadConversations = async () => {
    setIsLoading(true);
    try {
      const data = await api.getConversations();
      if (data.length > 0) {
        setConversations(data);
        if (!activeConversationId) setActiveConversationId(data[0].id);
      }
    } catch (err) {
      console.log("Using dummy data - Flask backend not available");
      setError(err instanceof Error ? err : new Error("Failed to fetch conversations"));
      setConversations(dummyConversations);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMessages = useCallback(async () => {
    if (!activeConversationId) return;
    setIsLoading(true);
    try {
      const data = await api.getMessages(activeConversationId);
      setMessages(data.length > 0 ? data : (dummyMessages[activeConversationId] || []));
    } catch (err) {
      console.log("Using dummy messages - Flask backend not available");
      setMessages(dummyMessages[activeConversationId] || []);
    } finally {
      setIsLoading(false);
    }
  }, [activeConversationId]);

  const sendMessage = useCallback(async (content: string) => {
    if (!activeConversationId || !content.trim()) return;

    const optimisticMessage: Message = {
      id: `msg-${Date.now()}`,
      conversationId: activeConversationId,
      senderId: "user-1",
      senderName: "You",
      senderInitials: "ME",
      content: content.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      createdAt: new Date(),
      isOwn: true,
    };

    // Optimistic update
    setMessages((prev) => [...prev, optimisticMessage]);
    setConversations((prev) =>
      prev.map((conv) =>
        conv.id === activeConversationId
          ? { ...conv, lastMessage: content.trim(), lastMessageAt: new Date() }
          : conv
      )
    );

    try {
      await api.sendMessage({
        conversationId: activeConversationId,
        content: content.trim(),
        senderId: "user-1",
      });
    } catch (err) {
      console.log("Message sent locally - Flask backend not available");
    }
  }, [activeConversationId]);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    loadMessages();
  }, [loadMessages]);

  return {
    conversations,
    messages,
    activeConversation,
    isLoading,
    error,
    setActiveConversationId,
    sendMessage,
    refetch: loadConversations,
  };
};
