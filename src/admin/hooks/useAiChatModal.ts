import { useCallback, useState } from 'react';
import type { UUID } from '@/admin/types';

type EntityType = 'REQUEST' | 'OFFER' | 'PROJECT';

interface ChatTarget {
    entityId: UUID | null;
    entityType: EntityType | null;
}

export function useAiChatModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [target, setTarget] = useState<ChatTarget>({
        entityId: null,
        entityType: null,
    });

    const open = useCallback((entityId: UUID, entityType: EntityType) => {
        setTarget({ entityId, entityType });
        setIsOpen(true);
    }, []);

    const close = useCallback(() => {
        setIsOpen(false);
        setTarget({ entityId: null, entityType: null });
    }, []);

    const toggle = useCallback(
        (entityId: UUID, entityType: EntityType) => {
            setTarget({ entityId, entityType });
            setIsOpen((prev) => !prev);
        },
        []
    );

    return {
        isOpen,
        entityId: target.entityId,
        entityType: target.entityType,
        open,
        close,
        toggle,
    };
}