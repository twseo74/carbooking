
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';
import { USERS } from '../constants';

interface AuthContextType {
  user: User | null;
  login: (id: string, pass: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (id: string, pass: string): boolean => {
    const userData = USERS[id];
    if (userData && userData.password === pass) {
      setUser(userData.user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
