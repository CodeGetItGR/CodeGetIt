import type { EntityType, UUID } from '@/admin/types';

interface EntityQueryKeys {
  root: readonly [string];
  list: (params: object) => readonly [string, object];
  detail: (id: UUID) => readonly [string, UUID];
}

interface RelationalQueryKeys {
  scoped: (entityType: EntityType, entityId: UUID) => readonly [string, EntityType, UUID];
  list: (entityType: EntityType, entityId: UUID, page: number) => readonly [string, EntityType, UUID, number];
}

interface QueryKeys {
  dashboard: {
    requestsCount: readonly [string, string];
    offersCount: readonly [string, string];
    projectsCount: readonly [string, string];
  };
  requests: EntityQueryKeys;
  offers: EntityQueryKeys;
  projects: EntityQueryKeys;
  notes: RelationalQueryKeys;
  history: RelationalQueryKeys;
  contactMessages: {
    root: readonly [string];
    list: (params: object) => readonly [string, object];
  };
}

export const queryKeys: QueryKeys = {
  dashboard: {
    requestsCount: ['dashboard', 'requests-count'],
    offersCount: ['dashboard', 'offers-count'],
    projectsCount: ['dashboard', 'projects-count'],
  },
  requests: {
    root: ['requests'],
    list: (params) => ['requests', params],
    detail: (id) => ['request', id],
  },
  offers: {
    root: ['offers'],
    list: (params) => ['offers', params],
    detail: (id) => ['offer', id],
  },
  projects: {
    root: ['projects'],
    list: (params) => ['projects', params],
    detail: (id) => ['project', id],
  },
  notes: {
    scoped: (entityType, entityId) => ['notes', entityType, entityId],
    list: (entityType, entityId, page) => ['notes', entityType, entityId, page],
  },
  history: {
    scoped: (entityType, entityId) => ['history', entityType, entityId],
    list: (entityType, entityId, page) => ['history', entityType, entityId, page],
  },
  contactMessages: {
    root: ['contact-messages'] as const,
    list: (params: object) => ['contact-messages', params] as const,
  },
};


