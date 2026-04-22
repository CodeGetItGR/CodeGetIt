import { useCallback, useMemo, useState, type ReactNode } from 'react';
import { AuditPanel } from '@/admin/components/AuditPanel';
import { NotesPanel } from '@/admin/components/NotesPanel';
import type { EntityType, UUID } from '@/admin/types';
import { useLocale } from '@/i18n/UseLocale';
import { cn } from '@/lib/utils';

interface DetailContentTabsProps {
  detailsLabel?: string;
  detailsContent: ReactNode;
  entityType: EntityType;
  entityId: UUID;
}

export const DetailContentTabs = ({
  detailsLabel = 'Details',
  detailsContent,
  entityType,
  entityId,
}: DetailContentTabsProps) => {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState<'details' | 'notes' | 'history'>('details');

  const labels = useMemo(
    () =>
      locale === 'el'
        ? {
            notes: 'Σημειωσεις',
            history: 'Ιστορικο ενεργειων',
          }
        : {
            notes: 'Notes',
            history: 'Audit history',
          },
    [locale],
  );

  const handleShowDetails = useCallback(() => {
    setActiveTab('details');
  }, []);

  const handleShowNotes = useCallback(() => {
    setActiveTab('notes');
  }, []);

  const handleShowHistory = useCallback(() => {
    setActiveTab('history');
  }, []);

  return (
    <section id="detail-tabs" className="rounded-2xl border border-gray-200 bg-white p-6">
      <div className="mb-6 border-b border-gray-200 pb-4">
        <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleShowDetails}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
            activeTab === 'details' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          )}
        >
          {detailsLabel}
        </button>
        <button
          type="button"
          onClick={handleShowNotes}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
            activeTab === 'notes' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          )}
        >
          {labels.notes}
        </button>
        <button
          type="button"
          onClick={handleShowHistory}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
            activeTab === 'history' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
          )}
        >
          {labels.history}
        </button>
        </div>
      </div>

      {activeTab === 'details' && detailsContent}
      {activeTab === 'notes' && <NotesPanel entityType={entityType} entityId={entityId} />}
      {activeTab === 'history' && <AuditPanel entityType={entityType} entityId={entityId} />}
    </section>
  );
};



