import { apiClient } from '@/admin/api/client';

export type AppSettingType = 'STRING' | 'BOOLEAN' | 'INTEGER';

export interface AppConfigResponse {
  key: string;
  value: string;
  type: AppSettingType;
}

export interface AppConfigUpsertPayload {
  value: string;
  type: AppSettingType;
}

export interface AppConfigBatchItem {
  key: string;
  value: string;
  type: AppSettingType;
}

export interface AppConfigBatchPayload {
  items: AppConfigBatchItem[];
}

export type PublicSettingsMap = Record<string, string>;

export const settingsApi = {
  getPublic: async () => {
    const { data } = await apiClient.get<PublicSettingsMap>('/settings/public');
    return data;
  },

  listAll: async () => {
    const { data } = await apiClient.get<AppConfigResponse[]>('/settings');
    return data;
  },

  upsert: async (key: string, payload: AppConfigUpsertPayload) => {
    const { data } = await apiClient.put<AppConfigResponse>(`/settings/${encodeURIComponent(key)}`, payload);
    return data;
  },

  batchUpdate: async (payload: AppConfigBatchPayload) => {
    const { data } = await apiClient.patch<AppConfigResponse[]>('/settings/batch', payload);
    return data;
  },
};

