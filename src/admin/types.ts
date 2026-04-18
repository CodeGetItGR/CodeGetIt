export type UUID = string;

export type Role = 'ROLE_USER' | 'ROLE_ADMIN';

export type RequestStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'COMPLETED';
export type OfferStatus = 'DRAFT' | 'SUBMITTED' | 'ACCEPTED' | 'CANCELLED' | 'REJECTED';
export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type EntityType = 'REQUEST' | 'OFFER' | 'PROJECT';
export type ActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'STATUS_CHANGE' | 'NOTE_ADDED';

export interface PagedResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ProblemDetail {
  type?: string;
  title?: string;
  status?: number;
  detail?: string;
  timestamp?: string;
  errors?: Record<string, string>;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: Role;
}

export interface RequestResponse {
  id: UUID;
  title: string;
  description?: string;
  requesterName: string;
  requesterEmail: string;
  requesterPhone: string;
  status: RequestStatus;
  priority: Priority;
  submittedByUserId: UUID | null;
  createdAt: string;
  updatedAt: string;
}

export interface OfferResponse {
  id: UUID;
  requestId: UUID;
  title: string;
  description?: string;
  status: OfferStatus;
  active: boolean;
  priceAmount?: number;
  currency?: string;
  validUntil?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectResponse {
  id: UUID;
  requestId: UUID;
  offerId: UUID;
  name: string;
  description?: string;
  status: ProjectStatus;
  ownerUserId?: UUID;
  createdAt: string;
  updatedAt: string;
}

export interface NoteResponse {
  id: UUID;
  entityType: EntityType;
  entityId: UUID;
  content: string;
  createdAt: string;
  createdBy: UUID;
}

export interface ActionHistoryResponse {
  id: UUID;
  entityType: EntityType;
  entityId: UUID;
  actionType: ActionType;
  fieldName?: string;
  oldValue?: string;
  newValue?: string;
  message?: string;
  performedAt: string;
  performedBy?: UUID;
}

export interface ApiError {
  status?: number;
  title: string;
  detail: string;
  fieldErrors?: Record<string, string>;
}

export interface ContactMessageResponse {
  id: UUID;
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

