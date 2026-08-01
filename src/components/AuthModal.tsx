import React from 'react';
import { AuthPage, AuthMode } from './AuthPage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: () => void;
  initialMode?: AuthMode;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  initialMode = 'login',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#f7f9fb] overflow-y-auto animate-fadeIn">
      <AuthPage
        initialMode={initialMode}
        onClose={onClose}
        onLoginSuccess={() => {
          onLoginSuccess();
          onClose();
        }}
      />
    </div>
  );
};
