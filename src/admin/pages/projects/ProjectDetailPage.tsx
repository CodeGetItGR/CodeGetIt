import { useCallback, useMemo, useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/admin/api/projects';
import { requestApi } from '@/admin/api/requests';
import { offerApi } from '@/admin/api/offers';
import { queryKeys } from '@/admin/api/queryKeys';
import { DetailContentTabs } from '@/admin/components/DetailContentTabs';
import { ProjectGithubRepoCard } from '@/admin/pages/projects/components/ProjectGithubRepoCard';
import { ProjectGithubRepoSheets } from '@/admin/pages/projects/components/ProjectGithubRepoSheets';
import { useProjectGithubRepoActions } from '@/admin/pages/projects/hooks/useProjectGithubRepoActions';
import { StatusBadge } from '@/admin/components/StatusBadge';
import { projectTransitions } from '@/admin/config/workflows';
import { useApiErrorState } from '@/admin/hooks/useApiErrorState';
import { useEntityDraftState } from '@/admin/hooks/useEntityDraftState';
import type { ProjectStatus } from '@/admin/types';
import { useLocale } from '@/i18n/UseLocale';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface ProjectFormState {
  name: string;
  description: string;
  deadline: string;
}

const defaultFormState: ProjectFormState = {
  name: '',
  description: '',
  deadline: '',
};

// Color map for project status transitions
const statusActionStyles: Record<ProjectStatus, string> = {
  IN_PROGRESS: 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent',
  COMPLETED:   'bg-blue-600 hover:bg-blue-700 text-white border-transparent',
  ON_HOLD:     'bg-amber-500 hover:bg-amber-600 text-white border-transparent',
  CANCELLED:   'bg-rose-600 hover:bg-rose-700 text-white border-transparent',
  PLANNING:    'bg-gray-600 hover:bg-gray-700 text-white border-transparent',
};

export const ProjectDetailPage = () => {
  const { id = '' } = useParams();
  const { t } = useLocale();
  const queryClient = useQueryClient();
  const { errorMessage, setApiError, clearError } = useApiErrorState();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);
  const [showAddLink, setShowAddLink] = useState(false);
  const [showAddPayment, setShowAddPayment] = useState(false);
  const [linkTitle, setLinkTitle] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentPaidAt, setPaymentPaidAt] = useState('');
  const [paymentNotes, setPaymentNotes] = useState('');

  const text = t.admin.projectDetail;
  const statusActionLabels = text.statusLabels;

  const projectDetailQueryKey = useMemo(() => ['project', id] as const, [id]);

  const projectQuery = useQuery({
    queryKey: projectDetailQueryKey,
    queryFn: () => projectApi.getById(id),
    enabled: Boolean(id),
  });

  const requestId = projectQuery.data?.requestId;
  const offerId = projectQuery.data?.offerId;

  const requestQuery = useQuery({
    queryKey: queryKeys.requests.detail(requestId ?? ''),
    queryFn: () => requestApi.getById(requestId!),
    enabled: Boolean(requestId),
  });

  const offerQuery = useQuery({
    queryKey: queryKeys.offers.detail(offerId ?? ''),
    queryFn: () => offerApi.getById(offerId!),
    enabled: Boolean(offerId),
  });

  const baseFormState = useMemo<ProjectFormState>(() => {
    const project = projectQuery.data;
    return {
      ...defaultFormState,
      name: project?.name ?? '',
      description: project?.description || '',
      deadline: project?.deadline ?? '',
    };
  }, [projectQuery.data]);

  const {
    state: formState,
    setField: handleFieldChange,
    resetDraft: resetFormDraft,
  } = useEntityDraftState<ProjectFormState>(id, baseFormState);

  const refreshProjectData = useCallback(async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: projectDetailQueryKey }),
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.root }),
    ]);
  }, [projectDetailQueryKey, queryClient]);

  const updateMutation = useMutation({
    mutationFn: () =>
      projectApi.update(id, {
        name: formState.name,
        description: formState.description || undefined,
        deadline: formState.deadline || null,
      }),
    onSuccess: async () => {
      clearError();
      resetFormDraft();
      await refreshProjectData();
    },
    onError: (error) => setApiError(error),
  });

  const statusMutation = useMutation({
    mutationFn: ({ targetStatus, reason }: { targetStatus: ProjectStatus; reason?: string }) =>
      projectApi.changeStatus(id, { targetStatus, reason }),
    onSuccess: async () => {
      clearError();
      await refreshProjectData();
    },
    onError: (error) => setApiError(error),
  });

  const addLinkMutation = useMutation({
    mutationFn: () =>
      projectApi.addLink(id, {
        title: linkTitle.trim(),
        url: linkUrl.trim(),
      }),
    onSuccess: async () => {
      clearError();
      setLinkTitle('');
      setLinkUrl('');
      setShowAddLink(false);
      await refreshProjectData();
    },
    onError: (error) => setApiError(error),
  });

  const deleteLinkMutation = useMutation({
    mutationFn: (linkId: string) => projectApi.deleteLink(id, linkId),
    onSuccess: async () => {
      clearError();
      await refreshProjectData();
    },
    onError: (error) => setApiError(error),
  });

  const addPaymentMutation = useMutation({
    mutationFn: () =>
      projectApi.addPayment(id, {
        amount: Number(paymentAmount),
        paidAt: paymentPaidAt,
        notes: paymentNotes.trim() || null,
      }),
    onSuccess: async () => {
      clearError();
      setPaymentAmount('');
      setPaymentPaidAt('');
      setPaymentNotes('');
      setShowAddPayment(false);
      await refreshProjectData();
    },
    onError: (error) => setApiError(error),
  });

  const deletePaymentMutation = useMutation({
    mutationFn: (paymentId: string) => projectApi.deletePayment(id, paymentId),
    onSuccess: async () => {
      clearError();
      await refreshProjectData();
    },
    onError: (error) => setApiError(error),
  });

  const githubRepoActions = useProjectGithubRepoActions({
    projectId: id,
    projectDetailQueryKey,
    onSuccess: clearError,
  });

  const isReadOnly = projectQuery.data?.status === 'CANCELLED';
  console.log(isReadOnly)

  const availableTransitions = useMemo(() => {
    const current = projectQuery.data?.status;
    if (!current) {
      return [] as ProjectStatus[];
    }
    return projectTransitions[current];
  }, [projectQuery.data?.status]);

  const handleUpdate = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (isReadOnly) return;
      await updateMutation.mutateAsync();
    },
    [isReadOnly, updateMutation],
  );

  const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('name', event.target.value);
  }, [handleFieldChange]);

  const handleDescriptionChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    handleFieldChange('description', event.target.value);
  }, [handleFieldChange]);

  const handleDeadlineChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('deadline', event.target.value);
  }, [handleFieldChange]);

  const handleStatusTransition = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const targetStatus = event.currentTarget.dataset.targetStatus as ProjectStatus | undefined;
    if (!targetStatus) {
      return;
    }
    if (targetStatus === 'CANCELLED') {
      setShowCancelConfirm(true);
      return;
    }
    statusMutation.mutate({ targetStatus });
  }, [statusMutation]);

  const handleConfirmProjectCancel = useCallback(() => {
    statusMutation.mutate({ targetStatus: 'CANCELLED' });
    setShowCancelConfirm(false);
  }, [statusMutation]);

  const handleCloseProjectCancelModal = useCallback(() => {
    setShowCancelConfirm(false);
  }, []);

  const handleLinkTitleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLinkTitle(event.target.value);
  }, []);

  const handleLinkUrlChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setLinkUrl(event.target.value);
  }, []);

  const handlePaymentAmountChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPaymentAmount(event.target.value);
  }, []);

  const handlePaymentPaidAtChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPaymentPaidAt(event.target.value);
  }, []);

  const handlePaymentNotesChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setPaymentNotes(event.target.value);
  }, []);

  const handleAddLink = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await addLinkMutation.mutateAsync();
    },
    [addLinkMutation],
  );

  const handleAddPayment = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      await addPaymentMutation.mutateAsync();
    },
    [addPaymentMutation],
  );

  const handleDeleteLink = useCallback((linkId: string) => {
    deleteLinkMutation.mutate(linkId);
  }, [deleteLinkMutation]);

  const handleDeletePayment = useCallback((paymentId: string) => {
    deletePaymentMutation.mutate(paymentId);
  }, [deletePaymentMutation]);

  if (projectQuery.isLoading) {
    return <p className="text-sm text-gray-500">{text.loading}</p>;
  }

  if (!projectQuery.data) {
    return <p className="text-sm text-gray-500">{text.notFound}</p>;
  }

  const project = projectQuery.data;
  const projectLinks = project.links ?? [];
  const projectPayments = project.payments ?? [];
  const deadlineBadge = (() => {
    if (!project.deadline) {
      return {
        label: text.noDeadline,
        className: 'bg-gray-100 text-gray-700 border-gray-200',
      };
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const deadlineDate = new Date(`${project.deadline}T00:00:00`);
    const daysLeft = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    if (daysLeft < 0) {
      return {
        label: `${text.overdue} (${Math.abs(daysLeft)}d)`,
        className: 'bg-rose-50 text-rose-700 border-rose-200',
      };
    }

    if (daysLeft <= 7) {
      return {
        label: `${daysLeft} ${text.daysLeft}`,
        className: 'bg-amber-50 text-amber-700 border-amber-200',
      };
    }

    return {
      label: project.deadline,
      className: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    };
  })();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-gray-500">{text.title}</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">{project.name}</h2>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge value={project.status} />
            <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${deadlineBadge.className}`}>
              {text.deadline}: {deadlineBadge.label}
            </span>
          </div>
        </div>
        <Link to="/admin/projects" className="text-sm font-medium text-gray-700 underline">
          {text.back}
        </Link>
      </div>

      {errorMessage && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>}
      {githubRepoActions.githubActionSuccess && <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{githubRepoActions.githubActionSuccess}</p>}
      {isReadOnly && <p className="rounded-xl border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600">{text.cancelledNote}</p>}


      {/* ── Sticky section nav ── */}
      <nav className="sticky top-3 z-10 -mx-1 flex gap-1 overflow-x-auto rounded-2xl border border-gray-200 bg-white/90 px-3 py-2 backdrop-blur">
        {[
          { label: text.navActions, href: '#section-actions' },
          { label: text.navLinked, href: '#section-linked' },
          { label: text.navDetails, href: '#detail-tabs' },
        ].map(({ label, href }) => (
          <a
            key={href}
            href={href}
            className="whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900 transition-colors"
          >
            {label}
          </a>
        ))}
      </nav>

      <div id="section-actions" className="space-y-2">
        <p className="text-sm text-gray-500">
          {text.status}: <span className="font-medium text-gray-700">{project.status.replace(/_/g, ' ')}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {availableTransitions.map((target) => (
            <button
              key={target}
              type="button"
              data-target-status={target}
              onClick={handleStatusTransition}
              disabled={statusMutation.isPending}
              className={`rounded-lg border px-4 py-2 text-sm font-medium transition-colors disabled:opacity-60 ${statusActionStyles[target] ?? 'border-gray-300 text-gray-700 hover:bg-gray-50'}`}
            >
              {statusActionLabels[target] ?? `${text.moveTo} ${target}`}
            </button>
          ))}
        </div>
        {availableTransitions.length === 0 && (
          <p className="text-sm text-gray-500">{text.noTransitions}</p>
        )}
      </div>

      <ProjectGithubRepoCard
        project={project}
        onCreateRepo={githubRepoActions.openCreateRepoSheet}
        onLinkRepo={githubRepoActions.openLinkRepoSheet}
        isReadOnly={isReadOnly}
      />

      <div className="grid gap-4 md:grid-cols-2">
        <section className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{text.links}</h3>
            {!isReadOnly && (
              <button
                type="button"
                onClick={() => setShowAddLink(v => !v)}
                className="text-xs font-medium text-gray-700 hover:text-gray-900"
              >
                {showAddLink ? '×' : text.addLink}
              </button>
            )}
          </div>

          {showAddLink && (
            <form className="mt-4 grid gap-2" onSubmit={handleAddLink}>
              <Input
                label={text.linkTitle}
                value={linkTitle}
                onChange={handleLinkTitleChange}
                className="rounded-xl px-3 py-2"
                required
              />
              <Input
                label={text.linkUrl}
                value={linkUrl}
                onChange={handleLinkUrlChange}
                className="rounded-xl px-3 py-2"
                required
              />
              <button
                type="submit"
                disabled={addLinkMutation.isPending}
                className="mt-1 rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
              >
                {addLinkMutation.isPending ? text.creatingLink : text.createLink}
              </button>
            </form>
          )}

          <div className="mt-3 max-h-64 space-y-2 overflow-y-auto">
            {projectLinks.length === 0 && <p className="text-sm text-gray-500">{text.noLinks}</p>}
            {projectLinks.map((link) => (
              <div key={link.id} className="flex items-center justify-between gap-2 rounded-lg border border-gray-200 px-3 py-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-gray-900">{link.title}</p>
                  <a href={link.url} target="_blank" rel="noreferrer" className="block truncate text-xs text-gray-500 hover:underline">
                    {link.url}
                  </a>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <a href={link.url} target="_blank" rel="noreferrer" className="text-xs font-medium text-gray-700 underline">
                    {text.open}
                  </a>
                  {!isReadOnly && (
                    <button
                      type="button"
                      onClick={() => handleDeleteLink(link.id)}
                      disabled={deleteLinkMutation.isPending}
                      className="text-xs font-medium text-rose-600 hover:text-rose-700"
                    >
                      {text.remove}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold text-gray-900">{text.payments}</h3>
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium text-gray-700">
                {text.totalPaid}: {(project.totalPaid ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
              {!isReadOnly && (
                <button
                  type="button"
                  onClick={() => setShowAddPayment(v => !v)}
                  className="text-xs font-medium text-gray-700 hover:text-gray-900"
                >
                  {showAddPayment ? '×' : '+'}
                </button>
              )}
            </div>
          </div>

          {showAddPayment && (
            <form className="mt-4 grid gap-2 md:grid-cols-2" onSubmit={handleAddPayment}>
              <Input
                label={text.amount}
                type="number"
                min="0.01"
                step="0.01"
                value={paymentAmount}
                onChange={handlePaymentAmountChange}
                className="rounded-xl px-3 py-2"
                required
              />
              <Input
                label={text.paidAt}
                type="date"
                value={paymentPaidAt}
                onChange={handlePaymentPaidAtChange}
                className="rounded-xl px-3 py-2"
                required
              />
              <Input
                label={text.notesOptional}
                value={paymentNotes}
                onChange={handlePaymentNotesChange}
                className="rounded-xl px-3 py-2 md:col-span-2"
              />
              <button
                type="submit"
                disabled={addPaymentMutation.isPending}
                className="rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60 md:col-span-2"
              >
                {addPaymentMutation.isPending ? text.registeringPayment : text.registerPayment}
              </button>
            </form>
          )}

          <div className="mt-3 max-h-64 space-y-1.5 overflow-y-auto">
            {projectPayments.length === 0 && <p className="text-sm text-gray-500">{text.noPayments}</p>}
            {projectPayments.map((payment) => (
              <div key={payment.id} className="flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2">
                <p className="w-20 shrink-0 text-sm font-medium tabular-nums text-gray-900">
                  {payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="w-24 shrink-0 text-xs text-gray-500">{payment.paidAt}</p>
                <p className="min-w-0 flex-1 truncate text-xs text-gray-400">{payment.notes || text.noNotes}</p>
                {!isReadOnly && (
                  <button
                    type="button"
                    onClick={() => handleDeletePayment(payment.id)}
                    disabled={deletePaymentMutation.isPending}
                    className="shrink-0 text-xs font-medium text-rose-600 hover:text-rose-700"
                  >
                    {text.remove}
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Linked Request & Offer overview ── */}
      <div id="section-linked" className="grid gap-4 md:grid-cols-2">
        {/* Linked Request */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">{text.linkedRequest}</p>
          {requestQuery.isLoading && <p className="text-sm text-gray-400">{text.loading}</p>}
          {!requestQuery.isLoading && !requestQuery.data && (
            <p className="text-sm text-gray-400">{text.noRequest}</p>
          )}
          {requestQuery.data && (() => {
            const req = requestQuery.data;
            return (
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-gray-900 leading-snug">{req.title}</p>
                  <StatusBadge value={req.status} />
                </div>
                <p className="text-sm text-gray-500">{req.requesterName} · {req.requesterEmail}</p>
                {req.description && (
                  <p className="line-clamp-2 text-sm text-gray-600">{req.description}</p>
                )}
                <Link
                  to={`/admin/requests/${req.id}`}
                  className="inline-block mt-1 text-xs font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900"
                >
                  {text.viewRequest} {'->'}
                </Link>
              </div>
            );
          })()}
        </div>

        {/* Linked Offer */}
        <div className="rounded-2xl border border-gray-200 bg-white p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gray-400">{text.linkedOffer}</p>
          {offerQuery.isLoading && <p className="text-sm text-gray-400">{text.loading}</p>}
          {!offerQuery.isLoading && !offerQuery.data && (
            <p className="text-sm text-gray-400">{text.noOffer}</p>
          )}
          {offerQuery.data && (() => {
            const offer = offerQuery.data;
            const total = offer.totalAmount != null
              ? `${offer.currency ?? '€'} ${offer.totalAmount.toLocaleString()}`
              : null;
            return (
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="font-medium text-gray-900 leading-snug">{offer.title}</p>
                  <StatusBadge value={offer.status} />
                </div>
                {total && <p className="text-sm font-semibold text-gray-700">{total}</p>}
                <p className="text-sm text-gray-500">{offer.recipientName ?? offer.recipientEmail}</p>
                {offer.description && (
                  <p className="line-clamp-2 text-sm text-gray-600">{offer.description}</p>
                )}
                <Link
                  to={`/admin/offers/${offer.id}`}
                  className="inline-block mt-1 text-xs font-medium text-gray-700 underline underline-offset-2 hover:text-gray-900"
                >
                  {text.viewOffer} {'->'}
                </Link>
              </div>
            );
          })()}
        </div>
      </div>

      <DetailContentTabs
        detailsLabel={text.details}
        entityType="PROJECT"
        entityId={project.id}
        detailsContent={(
          <form className="grid gap-4 md:grid-cols-2" onSubmit={handleUpdate}>
            <Input
              label={text.name}
              value={formState.name}
              onChange={handleNameChange}
              className="rounded-xl px-3 py-2"
              required
            />

            <Input
              label={text.deadline}
              type="date"
              value={formState.deadline}
              onChange={handleDeadlineChange}
              className="rounded-xl px-3 py-2"
            />

            <div className="md:col-span-2">
              <Textarea
                label={text.description}
                value={formState.description}
                onChange={handleDescriptionChange}
                rows={4}
                className="rounded-xl px-3 py-2"
              />
            </div>

            {!isReadOnly && (
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={updateMutation.isPending}
                  className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
                >
                  {updateMutation.isPending ? text.saving : text.save}
                </button>
              </div>
            )}
          </form>
        )}
      />

      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-gray-900">{text.cancelTitle}</h3>
            <p className="mt-2 text-sm text-gray-600">
              {text.cancelBody}
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={handleCloseProjectCancelModal}
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                {text.keep}
              </button>
              <button
                type="button"
                onClick={handleConfirmProjectCancel}
                disabled={statusMutation.isPending}
                className="rounded-lg bg-rose-600 px-3 py-2 text-sm font-medium text-white hover:bg-rose-700 disabled:opacity-60"
              >
                {statusMutation.isPending ? text.cancelling : text.confirmCancel}
              </button>
            </div>
          </div>
        </div>
      )}

      <ProjectGithubRepoSheets
        showCreateRepoSheet={githubRepoActions.showCreateRepoSheet}
        showLinkRepoSheet={githubRepoActions.showLinkRepoSheet}
        createRepoName={githubRepoActions.createRepoName}
        createPrivateRepo={githubRepoActions.createPrivateRepo}
        linkRepoUrl={githubRepoActions.linkRepoUrl}
        linkRepoName={githubRepoActions.linkRepoName}
        githubActionError={githubRepoActions.githubActionError}
        isPending={githubRepoActions.isGithubActionPending}
        onCloseCreateRepoSheet={githubRepoActions.closeCreateRepoSheet}
        onCloseLinkRepoSheet={githubRepoActions.closeLinkRepoSheet}
        onCreateRepoNameChange={githubRepoActions.handleCreateRepoNameChange}
        onCreatePrivateRepoChange={githubRepoActions.handleCreatePrivateRepoChange}
        onLinkRepoUrlChange={githubRepoActions.handleLinkRepoUrlChange}
        onLinkRepoNameChange={githubRepoActions.handleLinkRepoNameChange}
        onCreateRepoSubmit={githubRepoActions.submitCreateRepo}
        onLinkRepoSubmit={githubRepoActions.submitLinkRepo}
      />
    </div>
  );
};

