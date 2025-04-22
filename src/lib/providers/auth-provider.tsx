'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

import { useAuthStore, User } from '@/lib/stores/auth-store';

import { LoginModal } from '@/components/auth/login-modal';

interface AuthContextType {
  openLoginModal: () => void;
  closeLoginModal: () => void;
  logout: () => void;
  user: User | null;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [showModal, setShowModal] = useState(false);
  const { user, isAuthenticated, login, logout } = useAuthStore();

  const openLoginModal = () => setShowModal(true);
  const closeLoginModal = () => setShowModal(false);

  const handleLogin = (userData: User) => {
    login(userData);
    closeLoginModal();
  };

  return (
    <AuthContext.Provider
      value={{
        openLoginModal,
        closeLoginModal,
        logout,
        user,
        isAuthenticated,
      }}
    >
      {children}
      <LoginModal isOpen={showModal} onClose={closeLoginModal} onLogin={handleLogin} />
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
