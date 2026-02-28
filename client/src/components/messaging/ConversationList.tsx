import React, { useState } from 'react';
import { Conversation, User } from '../../types';
import { Search, PlusCircle } from 'lucide-react';

interface ConversationListProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  currentUser: User | null;
  onSelectConversation: (conversation: Conversation) => void;
  isLoading?: boolean;
}

const ConversationList: React.FC<ConversationListProps> = ({
  conversations,
  activeConversation,
  currentUser,
  onSelectConversation,
  isLoading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter conversations by search query
  const filteredConversations = conversations.filter(conv => {
    const otherParticipant = conv.participants.find(p => p.id !== currentUser?.id);
    return otherParticipant?.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    if (date > oneWeekAgo) return date.toLocaleDateString([], { weekday: 'short' });

    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const getOtherParticipant = (conversation: Conversation) => {
    if (!currentUser) return null;
    return conversation.participants.find(p => p.id !== currentUser.id);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <div className="w-full h-full flex flex-col note-card overflow-hidden">
      {/* Search and New Message */}
      <div className="p-4 border-b border-[var(--color-border)]">
        <div className="relative mb-4">
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="campus-input rounded-full pl-10"
          />
          <Search className="absolute left-3 top-2.5 text-[var(--color-muted)] h-5 w-5" />
        </div>
        <button className="w-full flex items-center justify-center space-x-2 bg-[var(--color-brand)] text-white py-2 px-4 rounded-full hover:bg-[var(--color-brand-strong)] transition-colors">
          <PlusCircle className="h-5 w-5" />
          <span>New Message</span>
        </button>
      </div>

      {/* Conversation List */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="animate-pulse space-y-4 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex p-3 space-x-3">
                <div className="h-12 w-12 bg-gray-300 rounded-full flex-shrink-0"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredConversations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-4 text-center">
            <p className="text-[var(--color-muted)]">No conversations found</p>
          </div>
        ) : (
          <div className="divide-y divide-[var(--color-border)]/70">
            {filteredConversations.map(conversation => {
              const otherParticipant = getOtherParticipant(conversation);
              const isActive = activeConversation?.id === conversation.id;

              return (
                <button
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation)}
                  className={`w-full flex items-start p-4 text-left hover:bg-[var(--color-brand-soft)]/35 transition-colors ${
                    isActive ? 'bg-[var(--color-brand-soft)]/55' : ''
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={otherParticipant?.avatar || 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100'}
                      alt={otherParticipant?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    {conversation.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="ml-3 flex-1 overflow-hidden">
                    <div className="flex justify-between items-baseline">
                      <h3 className={`font-medium truncate ${conversation.unreadCount > 0 ? 'text-[var(--color-ink)]' : 'text-[var(--color-muted)]'}`}>
                        {otherParticipant?.name}
                      </h3>
                      {conversation.lastMessage && (
                        <span className="text-xs text-[var(--color-muted)] whitespace-nowrap ml-2">
                          {formatTime(conversation.lastMessage.timestamp)}
                        </span>
                      )}
                    </div>

                    <p className={`text-sm truncate mt-1 ${
                      conversation.unreadCount > 0 ? 'text-[var(--color-ink)] font-medium' : 'text-[var(--color-muted)]'
                    }`}>
                      {conversation.lastMessage
                        ? truncateText(conversation.lastMessage.content, 40)
                        : 'No messages yet'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;
