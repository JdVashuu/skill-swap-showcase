import { useState, useEffect, useCallback } from "react";
import { Message, Conversation, SendMessagePayload } from "@/types/message";
import { dummyConversations, dummyMessages } from "@/data/dummyMessages";

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

// Simulates API fetch - replace with actual API call when backend is ready
const fetchConversations = async (): Promise<Conversation[]> => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/conversations');
  // return response.json();
  await new Promise((resolve) => setTimeout(resolve, 300));
  return dummyConversations;
};

const fetchMessages = async (conversationId: string): Promise<Message[]> => {
  // TODO: Replace with actual API call
  // const response = await fetch(`/api/conversations/${conversationId}/messages`);
  // return response.json();
  await new Promise((resolve) => setTimeout(resolve, 200));
  return dummyMessages[conversationId] || [];
};

const postMessage = async (payload: SendMessagePayload): Promise<Message> => {
  // TODO: Replace with actual API call
  // const response = await fetch('/api/messages', { method: 'POST', body: JSON.stringify(payload) });
  // return response.json();
  await new Promise((resolve) => setTimeout(resolve, 100));
  
  const newMessage: Message = {
    id: `msg-${Date.now()}`,
    conversationId: payload.conversationId,
    senderId: "user-1",
    senderName: "You",
    senderInitials: "ME",
    content: payload.content,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    createdAt: new Date(),
    isOwn: true,
  };
  
  return newMessage;
};

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
      const data = await fetchConversations();
      setConversations(data);
      if (data.length > 0 && !activeConversationId) {
        setActiveConversationId(data[0].id);
      }
    } catch (err) {
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
      const data = await fetchMessages(activeConversationId);
      setMessages(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch messages"));
      setMessages(dummyMessages[activeConversationId] || []);
    } finally {
      setIsLoading(false);
    }
  }, [activeConversationId]);

  const sendMessage = useCallback(async (content: string) => {
    if (!activeConversationId || !content.trim()) return;

    try {
      const newMessage = await postMessage({
        conversationId: activeConversationId,
        content: content.trim(),
      });
      
      setMessages((prev) => [...prev, newMessage]);
      
      // Update conversation's last message
      setConversations((prev) =>
        prev.map((conv) =>
          conv.id === activeConversationId
            ? { ...conv, lastMessage: content.trim(), lastMessageAt: new Date() }
            : conv
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to send message"));
      throw err;
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
