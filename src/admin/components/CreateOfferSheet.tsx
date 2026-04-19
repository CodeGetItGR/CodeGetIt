import { useCallback, useState, type ChangeEvent, type FormEvent } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { offerApi, type CreateOfferPayload } from '@/admin/api/offers';
import { SlideSheet } from '@/admin/components/SlideSheet';
import { useApiErrorState } from '@/admin/hooks/useApiErrorState';
import type { UUID } from '@/admin/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface CreateOfferSheetProps {
  isOpen: boolean;
  onClose: () => void;
  /** Pre-fill if opened from a request detail page */
  defaultRequestId?: UUID;
  onCreated?: () => void;
}

const blankForm = (): CreateOfferPayload => ({
  requestId: '',
  title: '',
  description: '',
  priceAmount: undefined,
  currency: 'USD',
  validUntil: undefined,
});

export const CreateOfferSheet = ({
  isOpen,
  onClose,
  defaultRequestId,
  onCreated,
}: CreateOfferSheetProps) => {
  const [form, setForm] = useState<CreateOfferPayload>(() => ({
    ...blankForm(),
    requestId: defaultRequestId ?? '',
  }));
  const [validUntilInput, setValidUntilInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const { errorMessage, setApiError, clearError } = useApiErrorState();
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: () =>
      offerApi.create({
        ...form,
        priceAmount: priceInput ? Number(priceInput) : undefined,
        validUntil: validUntilInput ? new Date(validUntilInput).toISOString() : undefined,
      }),
    onSuccess: async () => {
      clearError();
      const reset = { ...blankForm(), requestId: defaultRequestId ?? '' };
      setForm(reset);
      setValidUntilInput('');
      setPriceInput('');
      await queryClient.invalidateQueries({ queryKey: ['offers'] });
      onCreated?.();
      onClose();
    },
    onError: (error) => setApiError(error),
  });

  const setField = useCallback(
    <TKey extends keyof CreateOfferPayload>(key: TKey, value: CreateOfferPayload[TKey]) => {
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
    const reset = { ...blankForm(), requestId: defaultRequestId ?? '' };
    setForm(reset);
    setValidUntilInput('');
    setPriceInput('');
    clearError();
    onClose();
  }, [clearError, defaultRequestId, onClose]);

  const handleRequestIdChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setField('requestId', event.target.value);
  }, [setField]);

  const handleTitleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setField('title', event.target.value);
  }, [setField]);

  const handlePriceInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPriceInput(event.target.value);
  }, []);

  const handleCurrencyChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setField('currency', event.target.value.toUpperCase());
  }, [setField]);

  const handleValidUntilChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setValidUntilInput(event.target.value);
  }, []);

  const handleDescriptionChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    setField('description', event.target.value);
  }, [setField]);

  return (
    <SlideSheet
      isOpen={isOpen}
      onClose={handleClose}
      title="New offer"
      description="Create a commercial offer for an approved request."
    >
      <form className="space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Request ID"
          value={form.requestId}
          onChange={handleRequestIdChange}
          placeholder="UUID of the target request"
          disabled={Boolean(defaultRequestId)}
          className={defaultRequestId ? 'bg-gray-100 border-gray-200' : ''}
          required
        />

        <Input
          label="Offer title"
          value={form.title}
          onChange={handleTitleChange}
          placeholder="e.g. Full website redesign – Phase 1"
          required
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Price amount"
            type="number"
            step="0.01"
            min="0"
            value={priceInput}
            onChange={handlePriceInputChange}
            placeholder="1200.00"
          />
          <Input
            label="Currency"
            value={form.currency ?? ''}
            onChange={handleCurrencyChange}
            maxLength={5}
          />
        </div>

        <Input
          label="Valid until"
          type="date"
          value={validUntilInput}
          onChange={handleValidUntilChange}
        />

        <Textarea
          label="Description (optional)"
          value={form.description ?? ''}
          onChange={handleDescriptionChange}
          rows={4}
          placeholder="Scope, deliverables, terms..."
        />

        {errorMessage && (
          <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>
        )}

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={createMutation.isPending}
            className="flex-1 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
          >
            {createMutation.isPending ? 'Creating...' : 'Create offer'}
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

