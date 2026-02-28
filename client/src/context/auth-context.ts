import { createContext } from 'react';
import { User } from '../types';

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  college: string;
  collegeId: string;
  avatar?: string | null;
  phoneNumber?: string;
  address?: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterInput) => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
