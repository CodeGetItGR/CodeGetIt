import type { GithubRepoStatus, OfferStatus, Priority, ProjectStatus, RequestStatus } from '@/admin/types';

type StatusValue = RequestStatus | OfferStatus | ProjectStatus | Priority | GithubRepoStatus;

const colorMap: Record<StatusValue, string> = {
  DRAFT: 'bg-slate-100 text-slate-700 border-slate-200',
  SUBMITTED: 'bg-blue-50 text-blue-700 border-blue-200',
  APPROVED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  COMPLETED: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  ACCEPTED: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  CANCELLED: 'bg-zinc-100 text-zinc-700 border-zinc-200',
  REJECTED: 'bg-rose-50 text-rose-700 border-rose-200',
  PLANNING: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  IN_PROGRESS: 'bg-cyan-50 text-cyan-700 border-cyan-200',
  ON_HOLD: 'bg-amber-50 text-amber-700 border-amber-200',
  NOT_CREATED: 'bg-slate-100 text-slate-700 border-slate-200',
  CREATED: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  FAILED: 'bg-rose-50 text-rose-700 border-rose-200',
  LOW: 'bg-slate-100 text-slate-700 border-slate-200',
  MEDIUM: 'bg-blue-50 text-blue-700 border-blue-200',
  HIGH: 'bg-amber-50 text-amber-700 border-amber-200',
  URGENT: 'bg-rose-50 text-rose-700 border-rose-200',
};

interface StatusBadgeProps {
  value: StatusValue;
}

export const StatusBadge = ({ value }: StatusBadgeProps) => {
  return (
    <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${colorMap[value]}`}>
      {value.replace('_', ' ')}
    </span>
  );
};

