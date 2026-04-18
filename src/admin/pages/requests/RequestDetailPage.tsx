import { useCallback, useMemo, useState, type FormEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/admin/api/queryKeys';
import { requestApi } from '@/admin/api/requests';
import { CreateOfferSheet } from '@/admin/components/CreateOfferSheet';
import { EntityAuxPanels } from '@/admin/components/EntityAuxPanels';
import { StatusBadge } from '@/admin/components/StatusBadge';
import { requestTransitions } from '@/admin/config/workflows';
import { useApiErrorState } from '@/admin/hooks/useApiErrorState';
import { useEntityDraftState } from '@/admin/hooks/useEntityDraftState';
import type { Priority, RequestStatus } from '@/admin/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

const priorities: readonly Priority[] = ['LOW', 'MEDIUM', 'HIGH', 'URGENT'];

interface RequestFormState {
  title: string;
  description: string;
  requesterName: string;
  priority: Priority;
}

const defaultFormState: RequestFormState = {
  title: '',
  description: '',
  requesterName: '',
  priority: 'MEDIUM',
};

export const RequestDetailPage = () => {
  const { id = '' } = useParams();
  const queryClient = useQueryClient();
  const { errorMessage, setApiError, clearError } = useApiErrorState();
  const [showCreateOffer, setShowCreateOffer] = useState(false);

  const requestQuery = useQuery({
    queryKey: queryKeys.requests.detail(id),
    queryFn: () => requestApi.getById(id),
    enabled: Boolean(id),
  });

  const baseFormState = useMemo<RequestFormState>(() => {
    const request = requestQuery.data;
    return {
      ...defaultFormState,
      title: request?.title ?? '',
      description: request?.description || '',
      requesterName: request?.requesterName ?? '',
      priority: request?.priority ?? 'MEDIUM',
    };
  }, [requestQuery.data]);

  const {
    state: formState,
    setField: handleFieldChange,
    resetDraft: resetFormDraft,
  } = useEntityDraftState<RequestFormState>(id, baseFormState);

  const refreshRequestData = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: queryKeys.requests.detail(id) }),
      queryClient.invalidateQueries({ queryKey: queryKeys.requests.root }),
    ]);
  }, [id, queryClient]);

  const updateMutation = useMutation({
    mutationFn: (payload: RequestFormState) => requestApi.update(id, payload),
    onSuccess: async () => {
      clearError();
      resetFormDraft();
      await refreshRequestData();
    },
    onError: (error) => setApiError(error),
  });

  const statusMutation = useMutation({
    mutationFn: ({ targetStatus, reason }: { targetStatus: RequestStatus; reason?: string }) =>
      requestApi.changeStatus(id, { targetStatus, reason }),
    onSuccess: async () => {
      clearError();
      await refreshRequestData();
    },
    onError: (error) => setApiError(error),
  });

  const availableTransitions = useMemo(() => {
    const current = requestQuery.data?.status;
    if (!current) {
      return [] as RequestStatus[];
    }
    return requestTransitions[current];
  }, [requestQuery.data?.status]);

  const handleUpdate = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await updateMutation.mutateAsync(formState);
    },
    [formState, updateMutation],
  );

  if (requestQuery.isLoading) {
    return <p className="text-sm text-gray-500">Loading request...</p>;
  }

  if (!requestQuery.data) {
    return <p className="text-sm text-gray-500">Request not found.</p>;
  }

  const request = requestQuery.data;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-gray-500">Request detail</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">{request.title}</h2>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge value={request.status} />
            <StatusBadge value={request.priority} />
          </div>
        </div>
        <div className="flex items-center gap-3">
          {request.status === 'APPROVED' && (
            <button
              type="button"
              onClick={() => setShowCreateOffer(true)}
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
            >
              + Create offer
            </button>
          )}
          <Link to="/admin/requests" className="text-sm font-medium text-gray-700 underline">
            Back to requests
          </Link>
        </div>
      </div>

      {errorMessage && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>}

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Editable details</h3>
        <p className="mt-1 text-sm text-gray-600">Contact email and phone are immutable by backend contract.</p>

        <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleUpdate}>
          <Input
            label="Title"
            value={formState.title}
            onChange={(event) => handleFieldChange('title', event.target.value)}
            className="rounded-xl px-3 py-2"
            required
          />

          <Input
            label="Requester name"
            value={formState.requesterName}
            onChange={(event) => handleFieldChange('requesterName', event.target.value)}
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

          <label className="text-sm">
            <span className="mb-1 block text-gray-600">Priority</span>
            <select
              value={formState.priority}
              onChange={(event) => handleFieldChange('priority', event.target.value as Priority)}
              className="w-full rounded-xl border border-gray-300 px-3 py-2"
            >
              {priorities.map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
          </label>

          <Input label="Requester email (read only)" value={request.requesterEmail} disabled className="rounded-xl px-3 py-2 bg-gray-100 border-gray-200" />

          <Input label="Requester phone (read only)" value={request.requesterPhone} disabled className="rounded-xl px-3 py-2 bg-gray-100 border-gray-200" />

          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
            >
              {updateMutation.isPending ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Status actions</h3>
        <p className="mt-1 text-sm text-gray-600">Only valid transitions are shown.</p>

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
        <EntityAuxPanels entityType="REQUEST" entityId={request.id} />
      </section>

      <CreateOfferSheet
        isOpen={showCreateOffer}
        onClose={() => setShowCreateOffer(false)}
        defaultRequestId={request.id}
        onCreated={() => queryClient.invalidateQueries({ queryKey: queryKeys.offers.root })}
      />
    </div>
  );
};


