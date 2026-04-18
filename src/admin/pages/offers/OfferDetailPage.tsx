import { useCallback, useMemo, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { offerApi } from '@/admin/api/offers';
import { queryKeys } from '@/admin/api/queryKeys';
import { EntityAuxPanels } from '@/admin/components/EntityAuxPanels';
import { StatusBadge } from '@/admin/components/StatusBadge';
import { offerTransitions } from '@/admin/config/workflows';
import { useApiErrorState } from '@/admin/hooks/useApiErrorState';
import { useEntityDraftState } from '@/admin/hooks/useEntityDraftState';
import type { OfferStatus } from '@/admin/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface OfferFormState {
  title: string;
  description: string;
  priceAmount: string;
  currency: string;
  validUntil: string;
}

const defaultFormState: OfferFormState = {
  title: '',
  description: '',
  priceAmount: '',
  currency: '',
  validUntil: '',
};

function toIsoDateInput(value?: string): string {
  if (!value) {
    return '';
  }
  return value.slice(0, 10);
}

export const OfferDetailPage = () => {
  const { id = '' } = useParams();
  const queryClient = useQueryClient();
  const { errorMessage, setApiError, clearError } = useApiErrorState();

  const offerQuery = useQuery({
    queryKey: queryKeys.offers.detail(id),
    queryFn: () => offerApi.getById(id),
    enabled: Boolean(id),
  });

  const baseFormState = useMemo<OfferFormState>(() => {
    const offer = offerQuery.data;
    return {
      ...defaultFormState,
      title: offer?.title ?? '',
      description: offer?.description || '',
      priceAmount: typeof offer?.priceAmount === 'number' ? String(offer.priceAmount) : '',
      currency: offer?.currency || 'USD',
      validUntil: toIsoDateInput(offer?.validUntil),
    };
  }, [offerQuery.data]);

  const {
    state: formState,
    setField: handleFieldChange,
    resetDraft: resetFormDraft,
  } = useEntityDraftState<OfferFormState>(id, baseFormState);

  const refreshOfferData = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.offers.detail(id) }),
      queryClient.invalidateQueries({ queryKey: queryKeys.offers.root }),
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.root }),
    ]);
  }, [id, queryClient]);

  const updateMutation = useMutation({
    mutationFn: () =>
      offerApi.update(id, {
        title: formState.title,
        description: formState.description || undefined,
        priceAmount: formState.priceAmount ? Number(formState.priceAmount) : undefined,
        currency: formState.currency || undefined,
        validUntil: formState.validUntil ? new Date(formState.validUntil).toISOString() : undefined,
      }),
    onSuccess: async () => {
      clearError();
      resetFormDraft();
      await refreshOfferData();
    },
    onError: (error) => setApiError(error),
  });

  const statusMutation = useMutation({
    mutationFn: ({ targetStatus, reason }: { targetStatus: OfferStatus; reason?: string }) =>
      offerApi.changeStatus(id, { targetStatus, reason }),
    onSuccess: async () => {
      clearError();
      await refreshOfferData();
    },
    onError: (error) => setApiError(error),
  });

  const acceptMutation = useMutation({
    mutationFn: () => offerApi.accept(id),
    onSuccess: async () => {
      clearError();
      await refreshOfferData();
    },
    onError: (error) => setApiError(error),
  });

  const cancelMutation = useMutation({
    mutationFn: () => offerApi.cancel(id),
    onSuccess: async () => {
      clearError();
      await refreshOfferData();
    },
    onError: (error) => setApiError(error),
  });

  const availableTransitions = useMemo(() => {
    const current = offerQuery.data?.status;
    if (!current) {
      return [] as OfferStatus[];
    }
    return offerTransitions[current];
  }, [offerQuery.data?.status]);

  const handleUpdate = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await updateMutation.mutateAsync();
    },
    [updateMutation],
  );

  if (offerQuery.isLoading) {
    return <p className="text-sm text-gray-500">Loading offer...</p>;
  }

  if (!offerQuery.data) {
    return <p className="text-sm text-gray-500">Offer not found.</p>;
  }

  const offer = offerQuery.data;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-gray-500">Offer detail</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">{offer.title}</h2>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge value={offer.status} />
          </div>
        </div>
        <Link to="/admin/offers" className="text-sm font-medium text-gray-700 underline">
          Back to offers
        </Link>
      </div>

      {errorMessage && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>}

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Offer details</h3>
        <p className="mt-1 text-sm text-gray-600">Only active offers can be updated or canceled.</p>

        <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleUpdate}>
          <Input
            label="Title"
            value={formState.title}
            onChange={(event) => handleFieldChange('title', event.target.value)}
            className="rounded-xl px-3 py-2"
            required
          />

          <Input
            label="Currency"
            value={formState.currency}
            onChange={(event) => handleFieldChange('currency', event.target.value.toUpperCase())}
            className="rounded-xl px-3 py-2"
            maxLength={5}
          />

          <Input
            label="Price amount"
            type="number"
            step="0.01"
            value={formState.priceAmount}
            onChange={(event) => handleFieldChange('priceAmount', event.target.value)}
            className="rounded-xl px-3 py-2"
          />

          <Input
            label="Valid until"
            type="date"
            value={formState.validUntil}
            onChange={(event) => handleFieldChange('validUntil', event.target.value)}
            className="rounded-xl px-3 py-2"
          />

          <div className="md:col-span-2">
            <Textarea
              label="Description"
              value={formState.description}
              onChange={(event) => handleFieldChange('description', event.target.value)}
              rows={4}
              className="rounded-xl px-3 py-2"
            />
          </div>

          <div className="md:col-span-2 flex flex-wrap gap-2">
            <button
              type="submit"
              disabled={updateMutation.isPending || !offer.active}
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
            >
              {updateMutation.isPending ? 'Saving...' : 'Save changes'}
            </button>

            <button
              type="button"
              onClick={() => acceptMutation.mutate()}
              disabled={acceptMutation.isPending || !offer.active || offer.status !== 'SUBMITTED'}
              className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 disabled:opacity-60"
            >
              Accept offer (creates project)
            </button>

            <button
              type="button"
              onClick={() => cancelMutation.mutate()}
              disabled={cancelMutation.isPending || !offer.active}
              className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 disabled:opacity-60"
            >
              Cancel offer
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Status actions</h3>
        <p className="mt-1 text-sm text-gray-600">Use for standard transitions. Prefer accept endpoint for accepted flow.</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {availableTransitions.length === 0 && <p className="text-sm text-gray-500">No further transitions available.</p>}
          {availableTransitions.map((target) => (
            <button
              key={target}
              type="button"
              onClick={() => statusMutation.mutate({ targetStatus: target })}
              disabled={statusMutation.isPending}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              Move to {target}
            </button>
          ))}
        </div>
      </section>

      <section>
        <EntityAuxPanels entityType="OFFER" entityId={offer.id} />
      </section>
    </div>
  );
};

