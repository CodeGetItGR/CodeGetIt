import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestApi, type SubmitRequestPayload } from '@/admin/api/requests';
import { SlideSheet } from '@/admin/components/SlideSheet';
import { useApiErrorState } from '@/admin/hooks/useApiErrorState';
import { useSettingsOptions } from '@/admin/hooks/useSettingsOptions';
import type {
  BudgetFlexibility,
  BudgetRange,
  CommunicationPreference,
  DataSensitivity,
  DecisionMakerRole,
  DesiredStartWindow,
  Priority,
  ProjectType,
} from '@/admin/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface CreateRequestSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated?: () => void;
}

const blankForm: SubmitRequestPayload = {
  title: '',
  description: '',
  requesterName: '',
  requesterEmail: '',
  requesterPhone: '',
  projectType: 'WEBSITE',
  businessGoal: '',
  organizationName: '',
  industry: '',
  targetAudience: '',
  desiredStartWindow: 'WITHIN_1_MONTH',
  targetLaunchWindow: '',
  budgetRange: 'UNKNOWN',
  budgetFlexibility: 'UNKNOWN',
  decisionMakerRole: 'OTHER',
  stakeholderCount: undefined,
  communicationPreference: 'EMAIL',
  legalOrBrandConstraints: '',
  dataSensitivity: 'NONE',
  priority: 'MEDIUM',
};

export const CreateRequestSheet = ({ isOpen, onClose, onCreated }: CreateRequestSheetProps) => {
  const [form, setForm] = useState<SubmitRequestPayload>(blankForm);
  const { errorMessage, setApiError, clearError } = useApiErrorState();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: () => requestApi.submit(form),
    onSuccess: async () => {
      clearError();
      setForm(blankForm);
      await queryClient.invalidateQueries({ queryKey: ['requests'] });
      onCreated?.();
      onClose();
    },
    onError: (error) => setApiError(error),
  });

  const setField = useCallback(
    <TKey extends keyof SubmitRequestPayload>(key: TKey, value: SubmitRequestPayload[TKey]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      createMutation.mutate();
    },
    [createMutation],
  );

  const handleClose = useCallback(() => {
    setForm(blankForm);
    clearError();
    onClose();
  }, [clearError, onClose]);

  const handleTitleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setField('title', event.target.value);
  }, [setField]);

  const handleRequesterNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setField('requesterName', event.target.value);
  }, [setField]);

  const handleRequesterEmailChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setField('requesterEmail', event.target.value);
  }, [setField]);

  const handleRequesterPhoneChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setField('requesterPhone', event.target.value);
  }, [setField]);

  const handleDescriptionChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setField('description', event.target.value);
  }, [setField]);

  const handlePriorityChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setField('priority', event.target.value as Priority);
  }, [setField]);

  const handleProjectTypeChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setField('projectType', event.target.value as ProjectType);
  }, [setField]);

  const handleBusinessGoalChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setField('businessGoal', event.target.value);
  }, [setField]);

  const handleOrganizationNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setField('organizationName', event.target.value);
  }, [setField]);

  const handleIndustryChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setField('industry', event.target.value);
  }, [setField]);

  const handleTargetAudienceChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setField('targetAudience', event.target.value);
  }, [setField]);

  const handleDesiredStartWindowChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setField('desiredStartWindow', event.target.value as DesiredStartWindow);
  }, [setField]);

  const handleTargetLaunchWindowChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setField('targetLaunchWindow', event.target.value);
  }, [setField]);

  const handleBudgetRangeChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setField('budgetRange', event.target.value as BudgetRange);
  }, [setField]);

  const handleBudgetFlexibilityChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setField('budgetFlexibility', event.target.value as BudgetFlexibility);
  }, [setField]);

  const handleDecisionMakerRoleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setField('decisionMakerRole', event.target.value as DecisionMakerRole);
  }, [setField]);

  const handleStakeholderCountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const parsed = Number(event.target.value);
    setField('stakeholderCount', Number.isFinite(parsed) && parsed > 0 ? parsed : undefined);
  }, [setField]);

  const handleCommunicationPreferenceChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setField('communicationPreference', event.target.value as CommunicationPreference);
  }, [setField]);

  const handleLegalConstraintsChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setField('legalOrBrandConstraints', event.target.value);
  }, [setField]);

  const handleDataSensitivityChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setField('dataSensitivity', event.target.value as DataSensitivity);
  }, [setField]);

  const { options: projectTypeOptions } = useSettingsOptions({ groupKey: 'request.projectType', scope: 'public', onlyEnabled: true });
  const { options: desiredStartWindowOptions } = useSettingsOptions({ groupKey: 'request.desiredStartWindow', scope: 'public', onlyEnabled: true });
  const { options: budgetRangeOptions } = useSettingsOptions({ groupKey: 'request.budgetRange', scope: 'public', onlyEnabled: true });
  const { options: budgetFlexibilityOptions } = useSettingsOptions({ groupKey: 'request.budgetFlexibility', scope: 'public', onlyEnabled: true });
  const { options: decisionMakerRoleOptions } = useSettingsOptions({ groupKey: 'request.decisionMakerRole', scope: 'public', onlyEnabled: true });
  const { options: communicationPreferenceOptions } = useSettingsOptions({ groupKey: 'request.communicationPreference', scope: 'public', onlyEnabled: true });
  const { options: dataSensitivityOptions } = useSettingsOptions({ groupKey: 'request.dataSensitivity', scope: 'public', onlyEnabled: true });
  const { options: priorityOptions } = useSettingsOptions({ groupKey: 'request.priority', scope: 'public', onlyEnabled: true });

  return (
    <SlideSheet
      isOpen={isOpen}
      onClose={handleClose}
      title="New request"
      description="Submits a new service request via the public endpoint."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Title"
          value={form.title}
          onChange={handleTitleChange}
          placeholder="e.g. Landing page redesign"
          required
        />

        <Input
          label="Requester name"
          value={form.requesterName}
          onChange={handleRequesterNameChange}
          required
        />

        <Input
          label="Requester email"
          type="email"
          value={form.requesterEmail}
          onChange={handleRequesterEmailChange}
          required
        />

        <Input
          label="Requester phone"
          type="tel"
          value={form.requesterPhone}
          onChange={handleRequesterPhoneChange}
          required
        />

        <Textarea
          label="Description (optional)"
          value={form.description ?? ''}
          onChange={handleDescriptionChange}
          rows={3}
          placeholder="Brief context about the project..."
        />

        <div>
          <label className="mb-1 block text-sm text-gray-600">Project type</label>
          <select value={form.projectType} onChange={handleProjectTypeChange} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" required>
            {projectTypeOptions.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <Textarea
          label="Business goal"
          value={form.businessGoal}
          onChange={handleBusinessGoalChange}
          rows={3}
          placeholder="What outcome should this project deliver?"
          required
        />

        <Input label="Organization name" value={form.organizationName ?? ''} onChange={handleOrganizationNameChange} />
        <Input label="Industry" value={form.industry ?? ''} onChange={handleIndustryChange} />
        <Input label="Target audience" value={form.targetAudience ?? ''} onChange={handleTargetAudienceChange} />

        <div>
          <label className="mb-1 block text-sm text-gray-600">Desired start window</label>
          <select value={form.desiredStartWindow} onChange={handleDesiredStartWindowChange} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" required>
            {desiredStartWindowOptions.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <Input label="Target launch window" value={form.targetLaunchWindow ?? ''} onChange={handleTargetLaunchWindowChange} placeholder="e.g. Q4 2026" />

        <div>
          <label className="mb-1 block text-sm text-gray-600">Budget range</label>
          <select value={form.budgetRange} onChange={handleBudgetRangeChange} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" required>
            {budgetRangeOptions.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-600">Budget flexibility</label>
          <select value={form.budgetFlexibility} onChange={handleBudgetFlexibilityChange} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm">
            {budgetFlexibilityOptions.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-600">Decision-maker role</label>
          <select value={form.decisionMakerRole} onChange={handleDecisionMakerRoleChange} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm" required>
            {decisionMakerRoleOptions.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <Input
          label="Stakeholder count"
          type="number"
          min={1}
          max={1000}
          value={form.stakeholderCount?.toString() ?? ''}
          onChange={handleStakeholderCountChange}
        />

        <div>
          <label className="mb-1 block text-sm text-gray-600">Communication preference</label>
          <select value={form.communicationPreference} onChange={handleCommunicationPreferenceChange} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm">
            {communicationPreferenceOptions.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-600">Data sensitivity</label>
          <select value={form.dataSensitivity} onChange={handleDataSensitivityChange} className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm">
            {dataSensitivityOptions.map((item) => (
              <option key={item.value} value={item.value}>{item.label}</option>
            ))}
          </select>
        </div>

        <Textarea
          label="Legal or brand constraints"
          value={form.legalOrBrandConstraints ?? ''}
          onChange={handleLegalConstraintsChange}
          rows={3}
          placeholder="Compliance, brand, legal, or technical constraints"
        />

        <div>
          <label className="mb-1 block text-sm text-gray-600">Priority</label>
          <select
            value={form.priority}
            onChange={handlePriorityChange}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
          >
            {priorityOptions.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {errorMessage && (
          <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>
        )}

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="flex-1 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {createMutation.isPending ? 'Submitting...' : 'Submit request'}
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </SlideSheet>
  );
};

