import { useCallback, useMemo, type ChangeEvent, type FormEvent, type MouseEvent } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { projectApi } from '@/admin/api/projects';
import { queryKeys } from '@/admin/api/queryKeys';
import { EntityAuxPanels } from '@/admin/components/EntityAuxPanels';
import { ProjectGithubRepoCard } from '@/admin/pages/projects/components/ProjectGithubRepoCard';
import { ProjectGithubRepoSheets } from '@/admin/pages/projects/components/ProjectGithubRepoSheets';
import { useProjectGithubRepoActions } from '@/admin/pages/projects/hooks/useProjectGithubRepoActions';
import { StatusBadge } from '@/admin/components/StatusBadge';
import { projectTransitions } from '@/admin/config/workflows';
import { useApiErrorState } from '@/admin/hooks/useApiErrorState';
import { useEntityDraftState } from '@/admin/hooks/useEntityDraftState';
import type { ProjectStatus } from '@/admin/types';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

interface ProjectFormState {
  name: string;
  description: string;
  ownerUserId: string;
}

const defaultFormState: ProjectFormState = {
  name: '',
  description: '',
  ownerUserId: '',
};

export const ProjectDetailPage = () => {
  const { id = '' } = useParams();
  const queryClient = useQueryClient();
  const { errorMessage, setApiError, clearError } = useApiErrorState();

  const projectDetailQueryKey = useMemo(() => ['project', id] as const, [id]);

  const projectQuery = useQuery({
    queryKey: projectDetailQueryKey,
    queryFn: () => projectApi.getById(id),
    enabled: Boolean(id),
  });

  const baseFormState = useMemo<ProjectFormState>(() => {
    const project = projectQuery.data;
    return {
      ...defaultFormState,
      name: project?.name ?? '',
      description: project?.description || '',
      ownerUserId: project?.ownerUserId || '',
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
        ownerUserId: formState.ownerUserId || undefined,
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

  const handleOwnerUserIdChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    handleFieldChange('ownerUserId', event.target.value);
  }, [handleFieldChange]);

  const handleDescriptionChange = useCallback((event: ChangeEvent<HTMLTextAreaElement>) => {
    handleFieldChange('description', event.target.value);
  }, [handleFieldChange]);

  const handleStatusTransition = useCallback((event: MouseEvent<HTMLButtonElement>) => {
    const targetStatus = event.currentTarget.dataset.targetStatus as ProjectStatus | undefined;
    if (!targetStatus) {
      return;
    }
    statusMutation.mutate({ targetStatus });
  }, [statusMutation]);

  if (projectQuery.isLoading) {
    return <p className="text-sm text-gray-500">Loading project...</p>;
  }

  if (!projectQuery.data) {
    return <p className="text-sm text-gray-500">Project not found.</p>;
  }

  const project = projectQuery.data;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-gray-500">Project detail</p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900">{project.name}</h2>
          <div className="mt-2 flex items-center gap-2">
            <StatusBadge value={project.status} />
          </div>
        </div>
        <Link to="/admin/projects" className="text-sm font-medium text-gray-700 underline">
          Back to projects
        </Link>
      </div>

      {errorMessage && <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{errorMessage}</p>}
      {githubRepoActions.githubActionSuccess && <p className="rounded-xl bg-emerald-50 px-3 py-2 text-sm text-emerald-700">{githubRepoActions.githubActionSuccess}</p>}

      <ProjectGithubRepoCard
        project={project}
        onCreateRepo={githubRepoActions.openCreateRepoSheet}
        onLinkRepo={githubRepoActions.openLinkRepoSheet}
      />

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Project details</h3>

        <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleUpdate}>
          <Input
            label="Name"
            value={formState.name}
            onChange={handleNameChange}
            className="rounded-xl px-3 py-2"
            required
          />

          <Input
            label="Owner user ID"
            value={formState.ownerUserId}
            onChange={handleOwnerUserIdChange}
            className="rounded-xl px-3 py-2"
          />

          <div className="md:col-span-2">
            <Textarea
              label="Description"
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
              {updateMutation.isPending ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-gray-200 bg-white p-6">
        <h3 className="text-lg font-semibold text-gray-900">Status actions</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          {availableTransitions.length === 0 && <p className="text-sm text-gray-500">No further transitions available.</p>}
          {availableTransitions.map((target) => (
            <button
              key={target}
              type="button"
              data-target-status={target}
              onClick={handleStatusTransition}
              disabled={statusMutation.isPending}
              className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              Move to {target}
            </button>
          ))}
        </div>
      </section>

      <section>
        <EntityAuxPanels entityType="PROJECT" entityId={project.id} />
      </section>

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

