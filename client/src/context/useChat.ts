import { useContext } from 'react';
import { ChatContext, ChatContextType } from './chat-context';

export const useChat = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};
