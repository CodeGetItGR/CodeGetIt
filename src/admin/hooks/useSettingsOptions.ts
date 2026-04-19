import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/admin/api/queryKeys';
import { settingsApi, type SettingsOptionItem } from '@/admin/api/settings';

interface UseSettingsOptionsParams {
  groupKey: string;
  scope?: 'public' | 'admin';
  onlyEnabled?: boolean;
}

export function useSettingsOptions({
  groupKey,
  scope = 'admin',
  onlyEnabled = false,
}: UseSettingsOptionsParams) {
  const optionsQuery = useQuery({
    queryKey: scope === 'public' ? queryKeys.settings.optionsPublic : queryKeys.settings.options,
    queryFn: () => (scope === 'public' ? settingsApi.getPublicOptions() : settingsApi.listOptions()),
  });

  const options = useMemo<SettingsOptionItem[]>(() => {
    const group = optionsQuery.data?.groups.find((item) => item.key === groupKey);
    if (!group) {
      return [];
    }

    if (onlyEnabled) {
      return group.items.filter((item) => item.enabled);
    }

    return group.items;
  }, [groupKey, onlyEnabled, optionsQuery.data?.groups]);

  return {
    options,
    isLoading: optionsQuery.isLoading,
    isError: optionsQuery.isError,
  };
}

