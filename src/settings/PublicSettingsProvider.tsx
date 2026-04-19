import { useMemo, type ReactNode } from 'react';
import { useQuery } from '@tanstack/react-query';
import { settingsApi } from '@/admin/api/settings';
import { queryKeys } from '@/admin/api/queryKeys';
import { PublicSettingsContext, type PublicSettingsContextValue } from '@/settings/public-settings-context';

const asBool = (value: string | undefined, fallback = false) => {
  if (value == null) {
    return fallback;
  }

  return value.toLowerCase() === 'true';
};

export const PublicSettingsProvider = ({ children }: { children: ReactNode }) => {
  const settingsQuery = useQuery({
    queryKey: queryKeys.settings.public,
    queryFn: () => settingsApi.getPublic(),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const value = useMemo<PublicSettingsContextValue>(() => {
    const settings = settingsQuery.data ?? {};
    return {
      settings,
      isLoading: settingsQuery.isLoading,
      isError: settingsQuery.isError,
      getString: (key, fallback) => settings[key] || fallback,
      getBool: (key, fallback = false) => asBool(settings[key], fallback),
    };
  }, [settingsQuery.data, settingsQuery.isError, settingsQuery.isLoading]);

  return (
    <PublicSettingsContext.Provider value={value}>
      {children}
    </PublicSettingsContext.Provider>
  );
};


