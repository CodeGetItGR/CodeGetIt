import { createContext } from 'react';
import type { Role } from '@/admin/types';

export interface AuthState {
  token: string;
  username: string;
  role: Role;
}

export interface AuthContextValue {
  auth: AuthState | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

