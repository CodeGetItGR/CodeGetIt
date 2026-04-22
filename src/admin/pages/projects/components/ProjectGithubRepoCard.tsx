import type { ProjectResponse } from '@/admin/types';
import { StatusBadge } from '@/admin/components/StatusBadge';
import { useLocale } from '@/i18n/UseLocale';

interface ProjectGithubRepoCardProps {
  project: ProjectResponse;
  onCreateRepo: () => void;
  onLinkRepo: () => void;
}

export const ProjectGithubRepoCard = ({
  project,
  onCreateRepo,
  onLinkRepo,
}: ProjectGithubRepoCardProps) => {
  const { locale } = useLocale();
  const text = locale === 'el'
    ? {
        title: 'GitHub Αποθετηριο',
        create: 'Δημιουργια Repo',
        link: 'Συνδεση Υπαρχοντος Repo',
        repository: 'Αποθετηριο:',
        lastError: 'Τελευταιο σφαλμα:',
      }
    : {
        title: 'GitHub Repo',
        create: 'Create Repo',
        link: 'Link Existing Repo',
        repository: 'Repository:',
        lastError: 'Last error:',
      };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{text.title}</h3>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <StatusBadge value={project.githubRepoStatus ?? 'NOT_CREATED'} />
            {project.githubRepoOwner && project.githubRepoName && (
              <span className="rounded-lg bg-gray-100 px-2 py-1 font-mono text-xs text-gray-700">
                {project.githubRepoOwner}/{project.githubRepoName}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onCreateRepo}
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
          >
            {text.create}
          </button>
          <button
            type="button"
            onClick={onLinkRepo}
            className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {text.link}
          </button>
        </div>
      </div>

      {project.githubRepoUrl && (
        <p className="mt-3 text-sm">
          <span className="text-gray-600">{text.repository}</span>{' '}
          <a
            href={project.githubRepoUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium text-gray-900 underline"
          >
            {project.githubRepoUrl}
          </a>
        </p>
      )}

      {project.githubRepoStatus === 'FAILED' && project.githubLastError && (
        <p className="mt-3 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {text.lastError} {project.githubLastError}
        </p>
      )}
    </section>
  );
};

