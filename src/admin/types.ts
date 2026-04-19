export type UUID = string;

export type Role = 'ROLE_USER' | 'ROLE_ADMIN';

export type RequestStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'COMPLETED';
export type OfferStatus = 'DRAFT' | 'SUBMITTED' | 'ACCEPTED' | 'CANCELLED' | 'REJECTED';
export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';

export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type EntityType = 'REQUEST' | 'OFFER' | 'PROJECT';
export type ActionType = 'CREATE' | 'UPDATE' | 'DELETE' | 'STATUS_CHANGE' | 'NOTE_ADDED';
export type ProjectType = 'WEBSITE' | 'WEB_APP' | 'MOBILE_APP' | 'ECOMMERCE' | 'INTERNAL_TOOL' | 'AUTOMATION' | 'INTEGRATION' | 'OTHER';
export type DesiredStartWindow = 'ASAP' | 'WITHIN_1_MONTH' | 'WITHIN_3_MONTHS' | 'WITHIN_6_MONTHS' | 'FLEXIBLE';
export type BudgetRange = 'UNDER_2K' | 'FROM_2K_TO_5K' | 'FROM_5K_TO_10K' | 'FROM_10K_TO_25K' | 'ABOVE_25K' | 'UNKNOWN';
export type BudgetFlexibility = 'FIXED' | 'SOMEWHAT_FLEXIBLE' | 'FLEXIBLE' | 'UNKNOWN';
export type CommunicationPreference = 'EMAIL' | 'PHONE' | 'VIDEO_CALL' | 'MESSAGING_APP';
export type DataSensitivity = 'NONE' | 'BASIC_PERSONAL_DATA' | 'SENSITIVE_PERSONAL_DATA' | 'FINANCIAL_DATA' | 'HEALTHCARE_DATA' | 'OTHER';

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
  projectType: ProjectType;
  businessGoal: string;
  organizationName?: string;
  industry?: string;
  targetAudience?: string;
  desiredStartWindow: DesiredStartWindow;
  targetLaunchWindow?: string;
  budgetRange: BudgetRange;
  budgetFlexibility?: BudgetFlexibility;
  enterpriseInquiry: boolean;
  communicationPreference?: CommunicationPreference;
  legalOrBrandConstraints?: string;
  dataSensitivity?: DataSensitivity;
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

