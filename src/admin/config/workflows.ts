import type { OfferStatus, ProjectStatus, RequestStatus } from '@/admin/types';

export const requestTransitions: Record<RequestStatus, RequestStatus[]> = {
  DRAFT: ['SUBMITTED'],
  SUBMITTED: ['DRAFT', 'APPROVED'],
  APPROVED: ['COMPLETED'],
  COMPLETED: [],
};

export const offerTransitions: Record<OfferStatus, OfferStatus[]> = {
  DRAFT: ['SUBMITTED', 'CANCELLED'],
  SUBMITTED: ['CANCELLED', 'REJECTED'],
  ACCEPTED: [],
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

