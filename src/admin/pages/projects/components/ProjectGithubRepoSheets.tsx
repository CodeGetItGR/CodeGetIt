import type { ChangeEvent, FormEvent } from 'react';
import { SlideSheet } from '@/admin/components/SlideSheet';
import { useLocale } from '@/i18n/UseLocale';
import { Input } from '@/components/ui/Input';

interface ProjectGithubRepoSheetsProps {
  showCreateRepoSheet: boolean;
  showLinkRepoSheet: boolean;
  createRepoName: string;
  createPrivateRepo: boolean;
  linkRepoUrl: string;
  linkRepoName: string;
  githubActionError: string | null;
  isPending: boolean;
  onCloseCreateRepoSheet: () => void;
  onCloseLinkRepoSheet: () => void;
  onCreateRepoNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCreatePrivateRepoChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onLinkRepoUrlChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onLinkRepoNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCreateRepoSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onLinkRepoSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export const ProjectGithubRepoSheets = ({
  showCreateRepoSheet,
  showLinkRepoSheet,
  createRepoName,
  createPrivateRepo,
  linkRepoUrl,
  linkRepoName,
  githubActionError,
  isPending,
  onCloseCreateRepoSheet,
  onCloseLinkRepoSheet,
  onCreateRepoNameChange,
  onCreatePrivateRepoChange,
  onLinkRepoUrlChange,
  onLinkRepoNameChange,
  onCreateRepoSubmit,
  onLinkRepoSubmit,
}: ProjectGithubRepoSheetsProps) => {
  const { t } = useLocale();
  const text = t.admin.projectGithub.sheets;

  return (
    <>
      <SlideSheet
        isOpen={showCreateRepoSheet}
        onClose={onCloseCreateRepoSheet}
        title={text.createTitle}
        description={text.createDesc}
      >
        <form className="space-y-4" onSubmit={onCreateRepoSubmit}>
          <Input
            label={text.repoNameOptional}
            value={createRepoName}
            onChange={onCreateRepoNameChange}
            placeholder={text.repoNamePlaceholder}
          />

          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={createPrivateRepo}
              onChange={onCreatePrivateRepoChange}
            />
            <span>{text.privateRepo}</span>
          </label>

          {githubActionError && (
            <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{githubActionError}</p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
            >
              {isPending ? text.creating : text.createRepo}
            </button>
            <button
              type="button"
              onClick={onCloseCreateRepoSheet}
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              {text.cancel}
            </button>
          </div>
        </form>
      </SlideSheet>

      <SlideSheet
        isOpen={showLinkRepoSheet}
        onClose={onCloseLinkRepoSheet}
        title={text.linkTitle}
        description={text.linkDesc}
      >
        <form className="space-y-4" onSubmit={onLinkRepoSubmit}>
          <Input
            label={text.repoUrl}
            value={linkRepoUrl}
            onChange={onLinkRepoUrlChange}
            placeholder={text.repoUrlPlaceholder}
            required
          />

          <Input
            label={text.repoNameOverride}
            value={linkRepoName}
            onChange={onLinkRepoNameChange}
            placeholder={text.repoNameOverridePlaceholder}
          />

          {githubActionError && (
            <p className="rounded-xl bg-rose-50 px-3 py-2 text-sm text-rose-700">{githubActionError}</p>
          )}

          <div className="flex gap-2 pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="flex-1 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60"
            >
              {isPending ? text.linking : text.linkRepo}
            </button>
            <button
              type="button"
              onClick={onCloseLinkRepoSheet}
              className="rounded-xl border border-gray-300 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              {text.cancel}
            </button>
          </div>
        </form>
      </SlideSheet>
    </>
  );
};

