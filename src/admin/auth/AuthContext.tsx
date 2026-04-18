import { createContext, useCallback, useMemo, useState, type PropsWithChildren } from 'react';
import { authApi } from '@/admin/api/auth';
import { AUTH_STORAGE_KEY } from '@/admin/auth/constants';
import type { AuthResponse, Role } from '@/admin/types';

interface AuthState {
  token: string;
  username: string;
  role: Role;
}

interface AuthContextValue {
  auth: AuthState | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

function readStoredAuth(): AuthState | null {
  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as AuthState;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [auth, setAuth] = useState<AuthState | null>(() => readStoredAuth());

  const login = useCallback(async (username: string, password: string) => {
    const data: AuthResponse = await authApi.login({ username, password });
    const nextState: AuthState = {
      token: data.token,
      username: data.username,
      role: data.role,
    };

    setAuth(nextState);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(nextState));
  }, []);

  const logout = useCallback(() => {
    setAuth(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      auth,
      isAuthenticated: Boolean(auth?.token),
      isAdmin: auth?.role === 'ROLE_ADMIN',
      login,
      logout,
    }),
    [auth, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
