import { useCallback, useMemo, useState, type ChangeEvent } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/admin/api/queryKeys';
import { settingsApi, type AppSettingType } from '@/admin/api/settings';
import { useSettingsOptions } from '@/admin/hooks/useSettingsOptions';

interface SettingDefinition {
  key: string;
  label: string;
  group: 'Availability' | 'Marketing Hero' | 'CTA' | 'Banner' | 'Contact';
  type: AppSettingType;
  description?: string;
  defaultValue: string;
}

const SETTING_DEFINITIONS: SettingDefinition[] = [
  {
    key: 'availability.acceptingProjects',
    label: 'Accepting new projects',
    group: 'Availability',
    type: 'BOOLEAN',
    defaultValue: 'true',
  },
  {
    key: 'availability.statusMessage',
    label: 'Availability message',
    group: 'Availability',
    type: 'STRING',
    defaultValue: 'I am currently accepting new projects.',
  },
  {
    key: 'availability.contactFormEnabled',
    label: 'Contact form enabled',
    group: 'Availability',
    type: 'BOOLEAN',
    defaultValue: 'true',
  },
  {
    key: 'availability.requestSubmissionEnabled',
    label: 'Request submission CTA enabled',
    group: 'Availability',
    type: 'BOOLEAN',
    defaultValue: 'true',
  },
  {
    key: 'marketing.heroTitle',
    label: 'Hero title',
    group: 'Marketing Hero',
    type: 'STRING',
    defaultValue: '',
  },
  {
    key: 'marketing.heroSubtitle',
    label: 'Hero subtitle',
    group: 'Marketing Hero',
    type: 'STRING',
    defaultValue: '',
  },
  {
    key: 'marketing.ctaPrimaryText',
    label: 'Primary CTA text',
    group: 'CTA',
    type: 'STRING',
    defaultValue: 'Start a project',
  },
  {
    key: 'marketing.ctaPrimaryUrl',
    label: 'Primary CTA URL',
    group: 'CTA',
    type: 'STRING',
    defaultValue: '/contact',
    description: 'Use /path, #section-id, or a full https:// URL.',
  },
  {
    key: 'marketing.bannerEnabled',
    label: 'Banner enabled',
    group: 'Banner',
    type: 'BOOLEAN',
    defaultValue: 'false',
  },
  {
    key: 'marketing.bannerText',
    label: 'Banner text',
    group: 'Banner',
    type: 'STRING',
    defaultValue: '',
  },
  {
    key: 'marketing.bannerSeverity',
    label: 'Banner severity',
    group: 'Banner',
    type: 'STRING',
    defaultValue: 'info',
  },
  {
    key: 'marketing.contactEmail',
    label: 'Public contact email',
    group: 'Contact',
    type: 'STRING',
    defaultValue: 'hello@codegetit.com',
  },
];

const GROUP_ORDER: SettingDefinition['group'][] = ['Availability', 'Marketing Hero', 'CTA', 'Banner', 'Contact'];

export const SettingsPage = () => {
  const queryClient = useQueryClient();
  const [draftValues, setDraftValues] = useState<Record<string, string>>({});

  const settingsQuery = useQuery({
    queryKey: queryKeys.settings.list,
    queryFn: () => settingsApi.listAll(),
  });

  const optionsQuery = useQuery({
    queryKey: queryKeys.settings.options,
    queryFn: () => settingsApi.listOptions(),
  });

  const serverValues = useMemo(() => {
    const merged = SETTING_DEFINITIONS.reduce<Record<string, string>>((acc, definition) => {
      acc[definition.key] = definition.defaultValue;
      return acc;
    }, {});

    for (const item of settingsQuery.data ?? []) {
      merged[item.key] = item.value;
    }

    return merged;
  }, [settingsQuery.data]);

  const values = useMemo(
    () => ({ ...serverValues, ...draftValues }),
    [serverValues, draftValues],
  );

  const groupedDefinitions = useMemo(
    () => GROUP_ORDER.map((group) => ({
      group,
      items: SETTING_DEFINITIONS.filter((definition) => definition.group === group),
    })),
    [],
  );

  const saveMutation = useMutation({
    mutationFn: () => settingsApi.batchUpdate({
      items: SETTING_DEFINITIONS.map((definition) => ({
        key: definition.key,
        type: definition.type,
        value: values[definition.key] ?? definition.defaultValue,
      })),
    }),
    onSuccess: async () => {
      setDraftValues({});
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.settings.list }),
        queryClient.invalidateQueries({ queryKey: queryKeys.settings.public }),
      ]);
    },
  });

  const updateDisabledOptionsMutation = useMutation({
    mutationFn: ({ groupKey, disabledValues }: { groupKey: string; disabledValues: string[] }) =>
      settingsApi.updateDisabledOptions(groupKey, { disabledValues }),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.settings.options }),
        queryClient.invalidateQueries({ queryKey: queryKeys.settings.optionsPublic }),
      ]);
    },
  });

  const updateValue = useCallback((key: string, nextValue: string) => {
    setDraftValues((prev) => ({ ...prev, [key]: nextValue }));
  }, []);

  const handleSave = useCallback(() => {
    saveMutation.mutate();
  }, [saveMutation]);

  const handleSettingValueChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const key = event.currentTarget.dataset.settingKey;
    if (!key) {
      return;
    }
    updateValue(key, event.currentTarget.value);
  }, [updateValue]);

  const { options: bannerSeverityOptions } = useSettingsOptions({
    groupKey: 'settings.marketing.bannerSeverity',
    scope: 'admin',
  });

  const configurableOptionGroups = useMemo(
    () => (optionsQuery.data?.groups ?? []).filter((group) => group.configurable),
    [optionsQuery.data?.groups],
  );

  const handleOptionToggle = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const groupKey = event.currentTarget.dataset.groupKey;
    const optionValue = event.currentTarget.dataset.optionValue;
    if (!groupKey || !optionValue) {
      return;
    }

    const group = configurableOptionGroups.find((item) => item.key === groupKey);
    if (!group) {
      return;
    }

    const currentlyDisabled = group.items.filter((item) => !item.enabled).map((item) => item.value);
    const shouldEnable = event.currentTarget.checked;
    const nextDisabled = shouldEnable
      ? currentlyDisabled.filter((value) => value !== optionValue)
      : Array.from(new Set([...currentlyDisabled, optionValue]));

    updateDisabledOptionsMutation.mutate({ groupKey, disabledValues: nextDisabled });
  }, [configurableOptionGroups, updateDisabledOptionsMutation]);

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-gray-500">Settings</p>
          <h2 className="mt-1 text-3xl font-bold tracking-tight text-gray-900">Marketing controls</h2>
          <p className="mt-2 text-sm text-gray-600">Manage public-facing availability, hero copy, CTA behavior, banner, and contact settings.</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saveMutation.isPending || settingsQuery.isLoading}
          className="rounded-xl border border-gray-900 bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saveMutation.isPending ? 'Saving...' : 'Save all changes'}
        </button>
      </div>

      {settingsQuery.isLoading && (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-sm text-gray-500">Loading settings...</div>
      )}

      {settingsQuery.isError && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
          Unable to load settings. Please refresh the page.
        </div>
      )}

      {!settingsQuery.isLoading && !settingsQuery.isError && (
        <div className="space-y-6">
          {groupedDefinitions.map(({ group, items }) => (
            <section key={group} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900">{group}</h3>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                {items.map((item) => {
                  const value = values[item.key] ?? item.defaultValue;

                  return (
                    <div key={item.key} className="rounded-xl border border-gray-200 p-4">
                      <label className="block text-sm font-medium text-gray-800">{item.label}</label>
                      <p className="mt-1 text-xs text-gray-500">{item.key}</p>

                      {item.type === 'BOOLEAN' ? (
                        <select
                          value={value.toLowerCase() === 'true' ? 'true' : 'false'}
                          data-setting-key={item.key}
                          onChange={handleSettingValueChange}
                          className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
                        >
                          <option value="true">true</option>
                          <option value="false">false</option>
                        </select>
                      ) : item.key === 'marketing.bannerSeverity' ? (
                        <select
                          value={value || 'info'}
                          data-setting-key={item.key}
                          onChange={handleSettingValueChange}
                          className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
                        >
                          {bannerSeverityOptions.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={value}
                          data-setting-key={item.key}
                          onChange={handleSettingValueChange}
                          className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900"
                        />
                      )}

                      {item.description && <p className="mt-2 text-xs text-gray-500">{item.description}</p>}
                    </div>
                  );
                })}
              </div>
            </section>
          ))}

          {saveMutation.isError && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              Failed to save settings. Check values and try again.
            </div>
          )}

          {saveMutation.isSuccess && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              Settings saved successfully.
            </div>
          )}

          <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900">Request option availability</h3>
            <p className="mt-1 text-sm text-gray-600">Enable or disable selectable values shown in request forms.</p>

            {optionsQuery.isLoading && <p className="mt-4 text-sm text-gray-500">Loading option groups...</p>}

            {!optionsQuery.isLoading && configurableOptionGroups.length === 0 && (
              <p className="mt-4 text-sm text-gray-500">No configurable option groups available.</p>
            )}

            <div className="mt-5 space-y-5">
              {configurableOptionGroups.map((group) => (
                <div key={group.key} className="rounded-xl border border-gray-200 p-4">
                  <p className="text-sm font-semibold text-gray-900">{group.label}</p>
                  <p className="mt-1 text-xs text-gray-500">{group.key}</p>

                  <div className="mt-3 grid gap-2 md:grid-cols-2">
                    {group.items.map((item) => (
                      <label key={item.value} className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                          type="checkbox"
                          checked={item.enabled}
                          data-group-key={group.key}
                          data-option-value={item.value}
                          onChange={handleOptionToggle}
                          disabled={updateDisabledOptionsMutation.isPending}
                        />
                        <span>{item.label}</span>
                        <span className="text-xs text-gray-500">({item.value})</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {updateDisabledOptionsMutation.isError && (
              <p className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                Failed to update option availability. Please try again.
              </p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};



