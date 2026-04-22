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
}

const defaultFormState: ProjectFormState = {
  name: '',
  description: '',
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
  const { locale } = useLocale();
  const queryClient = useQueryClient();
  const { errorMessage, setApiError, clearError } = useApiErrorState();
  const [showCancelConfirm, setShowCancelConfirm] = useState(false);

  const statusActionLabels = useMemo<Record<ProjectStatus, string>>(
    () =>
      locale === 'el'
        ? {
            IN_PROGRESS: '▶ Εναρξη',
            COMPLETED: '✓ Ολοκληρωση',
            ON_HOLD: '⏸ Παυση',
            CANCELLED: '✕ Ακυρωση',
            PLANNING: '↩ Πισω σε σχεδιασμο',
          }
        : {
            IN_PROGRESS: '▶ Start',
            COMPLETED: '✓ Complete',
            ON_HOLD: '⏸ Pause',
            CANCELLED: '✕ Cancel',
            PLANNING: '↩ Back to Planning',
          },
    [locale],
  );

  const text = useMemo(
    () =>
      locale === 'el'
        ? {
            loading: 'Φορτωση project...',
            notFound: 'Το project δεν βρεθηκε.',
            title: 'Λεπτομερειες project',
            back: 'Πισω στα projects',
            noTransitions: 'Δεν υπαρχουν επιτρεπτες μεταβασεις.',
            save: 'Αποθηκευση αλλαγων',
            saving: 'Αποθηκευση...',
            details: 'Στοιχεια project',
            name: 'Ονομα',
            description: 'Περιγραφη',
            linkedRequest: 'Σχετικο Request',
            linkedOffer: 'Σχετικη Προσφορα',
            noRequest: 'Δεν υπαρχει συνδεδεμενο request.',
            noOffer: 'Δεν υπαρχει συνδεδεμενη προσφορα.',
            viewRequest: 'Προβολη request',
            viewOffer: 'Προβολη προσφορας',
            statusActions: 'Ενεργειες καταστασης',
            status: 'Κατασταση',
            navActions: 'Ενεργειες & Repo',
            navLinked: 'Συνδεδεμενα',
            navDetails: 'Στοιχεια',
            cancelTitle: 'Ακυρωση project;',
            cancelBody: 'Αυτη η ενεργεια ειναι οριστικη και σημαινει το project ως ακυρωμενο.',
            keep: 'Διατηρηση project',
            confirmCancel: 'Επιβεβαιωση ακυρωσης',
            cancelling: 'Ακυρωση...',
            moveTo: 'Μεταβαση σε',
          }
        : {
            loading: 'Loading project...',
            notFound: 'Project not found.',
            title: 'Project detail',
            back: 'Back to projects',
            noTransitions: 'No further transitions available.',
            save: 'Save changes',
            saving: 'Saving...',
            details: 'Project details',
            name: 'Name',
            description: 'Description',
            linkedRequest: 'Linked Request',
            linkedOffer: 'Linked Offer',
            noRequest: 'No linked request.',
            noOffer: 'No linked offer.',
            viewRequest: 'View request',
            viewOffer: 'View offer',
            statusActions: 'Status actions',
            status: 'Status',
            navActions: 'Actions & Repo',
            navLinked: 'Linked',
            navDetails: 'Details',
            cancelTitle: 'Cancel project?',
            cancelBody: 'This action is destructive and marks the project as cancelled.',
            keep: 'Keep project',
            confirmCancel: 'Confirm cancel',
            cancelling: 'Cancelling...',
            moveTo: 'Move to',
          },
    [locale],
  );

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

  const githubRepoActions = useProjectGithubRepoActions({
    projectId: id,
    projectDetailQueryKey,
    onSuccess: clearError,
  });

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
      await updateMutation.mutateAsync();
    },
    [updateMutation],
  );

  const handleNameChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('name', event.target.value);
  }, [handleFieldChange]);

  const handleDescriptionChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    handleFieldChange('description', event.target.value);
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

  if (projectQuery.isLoading) {
    return <p className="text-sm text-gray-500">{text.loading}</p>;
  }

  if (!projectQuery.data) {
    return <p className="text-sm text-gray-500">{text.notFound}</p>;
  }

  const project = projectQuery.data;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-gray-500">{text.title}</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">{project.name}</h2>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge value={project.status} />
          </div>
        </div>
        <Link to="/admin/projects" className="text-sm font-medium text-gray-700 underline">
          {text.back}
        </Link>
      </div>

      {errorMessage && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>}
      {githubRepoActions.githubActionSuccess && <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{githubRepoActions.githubActionSuccess}</p>}

      {/* ── Sticky section nav ── */}
      <nav className="sticky top-0 z-10 -mx-1 flex gap-1 overflow-x-auto rounded-2xl border border-gray-200 bg-white/90 px-3 py-2 backdrop-blur">
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

      {/* ── Actions + Repo side by side ── */}
      <div id="section-actions" className="grid gap-4 md:grid-cols-2">
        {/* Status actions */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-900">{text.statusActions}</h3>
          <p className="mt-0.5 text-sm text-gray-500">
            {text.status}: <span className="font-medium text-gray-700">{project.status.replace(/_/g, ' ')}</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {availableTransitions.length === 0 && (
              <p className="text-sm text-gray-500">{text.noTransitions}</p>
            )}
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
        </section>

        {/* GitHub repo */}
          <ProjectGithubRepoCard
            project={project}
            onCreateRepo={githubRepoActions.openCreateRepoSheet}
            onLinkRepo={githubRepoActions.openLinkRepoSheet}
          />
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

            <div className="md:col-span-2">
              <Textarea
                label={text.description}
                value={formState.description}
                onChange={handleDescriptionChange}
                rows={4}
                className="rounded-xl px-3 py-2"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={updateMutation.isPending}
                className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
              >
                {updateMutation.isPending ? text.saving : text.save}
              </button>
            </div>
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

