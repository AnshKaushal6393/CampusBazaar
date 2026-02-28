import React, { useState, useEffect } from 'react';
import { User } from '../types';
import { AuthContext, RegisterInput } from './auth-context';

interface StoredUser extends User {
  password: string;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const sanitizeUser = (storedUser: StoredUser): User => {
    const { password, ...safeUser } = storedUser;
    void password;
    return safeUser;
  };

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('campusbazaar-current-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser) as User);
      }
    } catch (err) {
      console.error('Failed to parse current user from localStorage:', err);
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('campusbazaar-users') || '[]') as StoredUser[];
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        const safeUser = sanitizeUser(foundUser);
        localStorage.setItem('campusbazaar-current-user', JSON.stringify(safeUser));
        setUser(safeUser);
        return true;
      }
    } catch (err) {
      console.error('Login error:', err);
    }
    return false;
  };

  const register = async (data: RegisterInput): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('campusbazaar-users') || '[]') as StoredUser[];
      const emailExists = users.some(u => u.email === data.email);
      if (emailExists) return false;

      const newUser: StoredUser = {
        id: Date.now().toString(),
        name: data.name,
        email: data.email,
        password: data.password,
        college: data.college,
        collegeId: data.collegeId,
        avatar: data.avatar ?? null,
        phoneNumber: data.phoneNumber,
        address: data.address,
        isAdmin: false,
      };

      const updatedUsers = [...users, newUser];
      const safeUser = sanitizeUser(newUser);
      localStorage.setItem('campusbazaar-users', JSON.stringify(updatedUsers));
      localStorage.setItem('campusbazaar-current-user', JSON.stringify(safeUser));
      setUser(safeUser);
      return true;
    } catch (err) {
      console.error('Registration error:', err);
      return false;
    }
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser: User = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('campusbazaar-current-user', JSON.stringify(updatedUser));

    try {
      const users = JSON.parse(localStorage.getItem('campusbazaar-users') || '[]') as StoredUser[];
      const updatedUsers = users.map((storedUser) =>
        storedUser.id === updatedUser.id ? { ...storedUser, ...updates } : storedUser
      );
      localStorage.setItem('campusbazaar-users', JSON.stringify(updatedUsers));
    } catch (err) {
      console.error('Failed to update stored user profile:', err);
    }
  };

  const logout = () => {
    localStorage.removeItem('campusbazaar-current-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
