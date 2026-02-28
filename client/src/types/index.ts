// User model
export interface User {
  id: string;
  name: string;
  email: string;
  college: string;
  collegeId?: string;
  avatar?: string | null;
  phoneNumber?: string;
  address?: string;
  password?: string;
  isAdmin: boolean;
}

// Product model
export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  condition: ProductCondition;
  images?: string[];         // Images now optional
  seller: User;
  createdAt: string;         // Consider using Date instead of string if possible
  isSold: boolean;
  isFree: boolean;
  college: string;
}

// Enum-like types for stricter safety
export type ProductCategory =
  | 'books'
  | 'electronics'
  | 'clothing'
  | 'furniture'
  | 'hostel'
  | 'sports'
  | 'other';

export type ProductCondition =
  | 'new'
  | 'like-new'
  | 'good'
  | 'fair'
  | 'poor';

// Chat-related models
export interface ChatMessage {
  id: string;
  senderId: string;
  receiverId: string;
  productId?: string;         // Optional: some chats may not link to a product
  content: string;
  timestamp: string;          // Again, Date might be better in future
  isRead: boolean;
}

export interface Conversation {
  id: string;
  participants: [User, User];   // Always two participants
  productId?: string;           // Optional link to product
  lastMessage?: ChatMessage;
  unreadCount: number;
}

// Filter options for product search
export interface FilterOptions {
  category?: ProductCategory | 'all';
  minPrice?: number;
  maxPrice?: number;
  condition?: ProductCondition | 'all';
  college?: string;
  search?: string;
  onlyFree?: boolean;
}
