import { createContext } from 'react';
import type { PublicSettingsMap } from '@/admin/api/settings';

export interface PublicSettingsContextValue {
  settings: PublicSettingsMap;
  isLoading: boolean;
  isError: boolean;
  getString: (key: string, fallback: string) => string;
  getBool: (key: string, fallback?: boolean) => boolean;
}

export const PublicSettingsContext = createContext<PublicSettingsContextValue | undefined>(undefined);

