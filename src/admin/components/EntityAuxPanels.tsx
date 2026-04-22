import { useCallback, useMemo, useState } from 'react';
import { AuditPanel } from '@/admin/components/AuditPanel';
import { NotesPanel } from '@/admin/components/NotesPanel';
import type { EntityType, UUID } from '@/admin/types';
import { useLocale } from '@/i18n/UseLocale';
import { cn } from '@/lib/utils';

type TabKey = 'notes' | 'history';

interface EntityAuxPanelsProps {
  entityType: EntityType;
  entityId: UUID;
}

export const EntityAuxPanels = ({ entityType, entityId }: EntityAuxPanelsProps) => {
  const { locale } = useLocale();
  const [activeTab, setActiveTab] = useState<TabKey>('notes');

  const labels = useMemo(
    () => ({
      notes: locale === 'el' ? 'Σημειωσεις' : 'Notes',
      audit: locale === 'el' ? 'Ιστορικο ενεργειων' : 'Audit history',
    }),
    [locale],
  );

  const handleShowNotes = useCallback(() => {
    setActiveTab('notes');
  }, []);

  const handleShowHistory = useCallback(() => {
    setActiveTab('history');
  }, []);

  return (
    <section>
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={handleShowNotes}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm',
            activeTab === 'notes' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700',
          )}
        >
          {labels.notes}
        </button>
        <button
          type="button"
          onClick={handleShowHistory}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm',
            activeTab === 'history' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700',
          )}
        >
          {labels.audit}
        </button>
      </div>

      {activeTab === 'notes' ? (
        <NotesPanel entityType={entityType} entityId={entityId} />
      ) : (
        <AuditPanel entityType={entityType} entityId={entityId} />
      )}
    </section>
  );
};

