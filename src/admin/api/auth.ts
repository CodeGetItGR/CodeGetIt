import { apiClient } from '@/admin/api/client';
import type { AuthResponse } from '@/admin/types';

interface LoginRequest {
  username: string;
  password: string;
}

export const authApi = {
  login: async (payload: LoginRequest) => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', payload);
    return data;
  },
};

