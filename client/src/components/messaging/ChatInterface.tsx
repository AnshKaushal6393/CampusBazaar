import React, { useState, useRef, useEffect } from 'react';
import { Conversation, ChatMessage, User } from '../../types';
import { Send, Image, Info } from 'lucide-react';

interface ChatInterfaceProps {
  conversation: Conversation | null;
  messages: ChatMessage[];
  currentUser: User | null;
  onSendMessage: (content: string) => Promise<void>;
  isLoading?: boolean;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({
  conversation,
  messages,
  currentUser,
  onSendMessage,
  isLoading = false,
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !currentUser || !conversation) return;

    setIsSending(true);
    try {
      await onSendMessage(message.trim());
      setMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getOtherParticipant = () => {
    if (!conversation || !currentUser) return null;
    return conversation.participants.find((p) => p.id !== currentUser.id);
  };

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full notebook-panel p-8 text-center rounded-lg">
        <div className="bg-[var(--color-brand-soft)] p-4 rounded-full mb-4">
          <Image className="h-12 w-12 text-[var(--color-brand)]" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--color-ink)] mb-2">No conversation selected</h3>
        <p className="text-[var(--color-muted)]">Select a conversation from the sidebar or start a new one.</p>
      </div>
    );
  }

  const otherParticipant = getOtherParticipant();

  return (
    <div className="flex flex-col h-full pin-card overflow-hidden">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-[var(--color-border)] bg-[var(--color-brand-soft)]/40">
        <div className="flex items-center space-x-3">
          <img
            src={
              otherParticipant?.avatar ||
              'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
            }
            alt={otherParticipant?.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-[var(--color-ink)]">{otherParticipant?.name}</h3>
            <p className="text-xs text-[var(--color-muted)]">{otherParticipant?.college}</p>
          </div>
        </div>
        <button className="text-[var(--color-muted)] hover:text-[var(--color-ink)]">
          <Info className="h-5 w-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-[#fcfdf8]">
        {isLoading ? (
          <div className="flex justify-center py-4">
            <div className="animate-pulse space-y-4 w-full max-w-md">
              <div className="flex items-end">
                <div className="h-8 w-8 rounded-full bg-gray-300 mr-2"></div>
                <div className="bg-gray-300 rounded-lg p-3 w-3/4"></div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center">
                <div className="bg-gray-200 p-4 rounded-full mb-4">
                  <Image className="h-8 w-8 text-gray-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No messages yet</h3>
                <p className="text-gray-500 text-sm">Start the conversation by sending a message below.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((msg, index) => {
                  const isCurrentUser = msg.senderId === currentUser?.id;
                  const showDate =
                    index === 0 ||
                    new Date(messages[index - 1].timestamp).toDateString() !==
                      new Date(msg.timestamp).toDateString();

                  return (
                    <React.Fragment key={msg.id}>
                      {showDate && (
                        <div className="flex justify-center my-4">
                          <span className="text-xs bg-[var(--color-brand-soft)] text-[var(--color-brand-strong)] px-3 py-1 rounded-full">
                            {formatDate(msg.timestamp)}
                          </span>
                        </div>
                      )}
                      <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                        <div className="flex items-end max-w-xs md:max-w-md">
                          {!isCurrentUser && (
                            <img
                              src={
                                otherParticipant?.avatar ||
                                'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'
                              }
                              alt={otherParticipant?.name}
                              className="w-8 h-8 rounded-full mr-2 object-cover"
                            />
                          )}
                          <div
                            className={`rounded-lg p-3 ${
                              isCurrentUser
                                ? 'bg-[var(--color-brand)] text-white rounded-br-none'
                                : 'bg-[#e8ece4] text-[var(--color-ink)] rounded-bl-none'
                            }`}
                          >
                            <p className="text-sm">{msg.content}</p>
                            <span
                              className={`text-xs mt-1 block ${
                                isCurrentUser ? 'text-[#d5f2e6]' : 'text-[var(--color-muted)]'
                              }`}
                            >
                              {formatTime(msg.timestamp)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            )}
          </>
        )}
      </div>

      {/* Message Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-[var(--color-border)] space-y-2">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSending}
            className="campus-input rounded-full"
          />
          <button
            type="submit"
            disabled={!message.trim() || isSending}
            className="bg-[var(--color-brand)] text-white p-2 rounded-full hover:bg-[var(--color-brand-strong)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        {isSending && (
          <p className="text-xs text-[var(--color-muted)] text-center">Sending...</p>
        )}
      </form>
    </div>
  );
};

export default ChatInterface;
