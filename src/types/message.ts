export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderInitials: string;
  content: string;
  timestamp: string;
  createdAt: Date;
  isOwn: boolean;
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantInitials: string;
  lastMessage: string;
  lastMessageAt: Date;
  unreadCount: number;
  skillContext?: string;
}

export interface SendMessagePayload {
  conversationId: string;
  content: string;
}
