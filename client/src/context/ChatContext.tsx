import React, { useState, useEffect } from 'react';
import { ChatMessage, Conversation, User } from '../types';
import { mockConversations, mockMessages } from '../data/mockData';
import { useAuth } from './useAuth';
import { ChatContext } from './chat-context';

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Load conversations when user changes
  useEffect(() => {
    if (!user) {
      setConversations([]);
      setActiveConversation(null);
      setMessages([]);
      setIsLoading(false);
      return;
    }

    const loadConversations = async () => {
      setIsLoading(true);
      // This would be an API call in production
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Filter conversations for the current user
      const userConversations = mockConversations.filter(conv => 
        conv.participants.some(p => p.id === user.id)
      );
      
      setConversations(userConversations);
      setIsLoading(false);
    };

    loadConversations();
  }, [user]);

  // Load messages when active conversation changes
  useEffect(() => {
    if (!activeConversation) {
      setMessages([]);
      return;
    }

    const loadMessages = async () => {
      setIsLoading(true);
      // This would be an API call in production
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Filter messages for the active conversation
      const conversationMessages = mockMessages
        .filter(msg => msg.productId === activeConversation.productId)
        .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
      
      setMessages(conversationMessages);
      setIsLoading(false);
    };

    loadMessages();
  }, [activeConversation]);

  const sendMessage = async (content: string) => {
    if (!activeConversation || !user) return;

    // Create new message
    const newMessage: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      senderId: user.id,
      receiverId: activeConversation.participants.find(p => p.id !== user.id)?.id || '',
      productId: activeConversation.productId,
      content,
      timestamp: new Date().toISOString(),
      isRead: false
    };

    // This would be an API call in production
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Add message to local state
    setMessages(prev => [...prev, newMessage]);
    
    // Update conversation with last message
    setConversations(prev => 
      prev.map(conv => 
        conv.id === activeConversation.id 
          ? { 
              ...conv, 
              lastMessage: newMessage 
            } 
          : conv
      )
    );
  };

  const startNewConversation = async (productId: string, sellerId: string): Promise<string> => {
    if (!user) throw new Error('User must be logged in');
    if (user.id === sellerId) throw new Error('Cannot start conversation with yourself');

    // Check if conversation already exists
    const existingConv = conversations.find(
      conv => 
        conv.productId === productId && 
        conv.participants.some(p => p.id === sellerId)
    );

    if (existingConv) {
      setActiveConversation(existingConv);
      return existingConv.id;
    }

    // This would be an API call in production
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Create mock seller
    const seller: User = {
      id: sellerId,
      name: 'Seller Name',
      email: 'seller@example.edu',
      college: 'State University',
      isAdmin: false
    };

    // Create new conversation
    const newConversation: Conversation = {
      id: Math.random().toString(36).substring(2, 9),
      participants: [user, seller],
      productId,
      unreadCount: 0
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversation(newConversation);
    
    return newConversation.id;
  };

  return (
    <ChatContext.Provider
      value={{
        conversations,
        activeConversation,
        messages,
        setActiveConversation,
        sendMessage,
        startNewConversation,
        isLoading
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
