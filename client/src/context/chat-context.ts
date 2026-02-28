import { createContext } from 'react';
import { ChatMessage, Conversation } from '../types';

export interface ChatContextType {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: ChatMessage[];
  setActiveConversation: (conversation: Conversation | null) => void;
  sendMessage: (content: string) => Promise<void>;
  startNewConversation: (productId: string, sellerId: string) => Promise<string>;
  isLoading: boolean;
}

export const ChatContext = createContext<ChatContextType | undefined>(undefined);
