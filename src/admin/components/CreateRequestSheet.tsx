import { useCallback, useState, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { requestApi, type SubmitRequestPayload } from '@/admin/api/requests';
import { SlideSheet } from '@/admin/components/SlideSheet';
import { useApiErrorState } from '@/admin/hooks/useApiErrorState';
import type { Priority } from '@/admin/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

const priorities: readonly Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

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
          onChange={(e) => setField('title', e.target.value)}
          placeholder="e.g. Landing page redesign"
          required
        />

        <Input
          label="Requester name"
          value={form.requesterName}
          onChange={(e) => setField('requesterName', e.target.value)}
          required
        />

        <Input
          label="Requester email"
          type="email"
          value={form.requesterEmail}
          onChange={(e) => setField('requesterEmail', e.target.value)}
          required
        />

        <Input
          label="Requester phone"
          type="tel"
          value={form.requesterPhone}
          onChange={(e) => setField('requesterPhone', e.target.value)}
          required
        />

        <Textarea
          label="Description (optional)"
          value={form.description ?? ''}
          onChange={(e) => setField('description', e.target.value)}
          rows={3}
          placeholder="Brief context about the project..."
        />

        <div>
          <label className="mb-1 block text-sm text-gray-600">Priority</label>
          <select
            value={form.priority}
            onChange={(e) => setField('priority', e.target.value as Priority)}
            className="w-full rounded-xl border border-gray-300 px-3 py-2 text-sm"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
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

