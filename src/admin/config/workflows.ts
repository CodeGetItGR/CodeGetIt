import type { OfferStatus, ProjectStatus, RequestStatus } from '@/admin/types';

export const requestTransitions: Record<RequestStatus, RequestStatus[]> = {
  DRAFT: ['SUBMITTED'],
  SUBMITTED: ['DRAFT', 'APPROVED'],
  APPROVED: ['COMPLETED'],
  COMPLETED: [],
};

export const offerTransitions: Record<OfferStatus, OfferStatus[]> = {
  DRAFT: ['SENT', 'CANCELLED', 'REJECTED'],
  SENT: ['ACCEPTED_BY_CLIENT', 'REJECTED_BY_CLIENT', 'CANCELLED'],
  ACCEPTED_BY_CLIENT: [],
  REJECTED_BY_CLIENT: ['DRAFT'],
  CANCELLED: [],
  REJECTED: [],
};

export const projectTransitions: Record<ProjectStatus, ProjectStatus[]> = {
  PLANNING: ['IN_PROGRESS', 'CANCELLED'],
  IN_PROGRESS: ['ON_HOLD', 'COMPLETED', 'CANCELLED'],
  ON_HOLD: ['IN_PROGRESS', 'CANCELLED'],
  COMPLETED: [],
  CANCELLED: [],
};

