import axios from 'axios';
import type { AxiosRequestConfig } from 'axios';
import type { ApiError, ProblemDetail } from '@/admin/types';
import { AUTH_STORAGE_KEY } from '@/admin/auth/constants';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Entries with a method are matched exactly; entries without a method match any method.
const PUBLIC_ENDPOINTS: { path: string; method?: string }[] = [
  { path: '/auth/login' },
  { path: '/auth/register' },
  { path: '/requests/submit', method: 'POST' },
  { path: '/contact-messages', method: 'POST' },
  { path: '/settings/public', method: 'GET' },
];

function isPublicEndpoint(config: AxiosRequestConfig): boolean {
  const requestUrl = config.url ?? '';
  const normalized = requestUrl.startsWith('http')
    ? requestUrl.replace(baseURL, '')
    : requestUrl;
  const method = (config.method ?? '').toUpperCase();

  for (const endpoint of PUBLIC_ENDPOINTS) {
    if (
      normalized.startsWith(endpoint.path) &&
      (!endpoint.method || endpoint.method === method)
    ) {
      return true;
    }
  }

  return false;
}

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function parseFieldErrors(detail?: string): Record<string, string> | undefined {
  if (!detail || !detail.includes(':')) {
    return undefined;
  }

  const result: Record<string, string> = {};
  const parts = detail.split('; ');
  for (const part of parts) {
    const [field, ...rest] = part.split(': ');
    if (field && rest.length > 0) {
      result[field.trim()] = rest.join(': ').trim();
    }
  }

  return Object.keys(result).length ? result : undefined;
}

export function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data as ProblemDetail | undefined;
    return {
      status: payload?.status ?? error.response?.status,
      title: payload?.title ?? 'Request failed',
      detail: payload?.detail ?? error.message,
      fieldErrors: payload?.errors ?? parseFieldErrors(payload?.detail),
    };
  }

  return {
    title: 'Unexpected error',
    detail: error instanceof Error ? error.message : 'Unknown error',
  };
}

apiClient.interceptors.request.use((config) => {
  if (isPublicEndpoint(config)) {
    if (config.headers && 'Authorization' in config.headers) {
      delete config.headers.Authorization;
    }
    return config;
  }

  const raw = localStorage.getItem(AUTH_STORAGE_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { token?: string };
      if (parsed.token) {
        config.headers.Authorization = `Bearer ${parsed.token}`;
      }
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    }
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      if (!window.location.pathname.startsWith('/admin/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  },
);



