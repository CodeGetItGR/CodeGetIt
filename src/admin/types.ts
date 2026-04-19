export type UUID = string;

export type Role = 'ROLE_USER' | 'ROLE_ADMIN';

export type RequestStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'COMPLETED';
export type OfferStatus = 'DRAFT' | 'SENT' | 'ACCEPTED_BY_CLIENT' | 'REJECTED_BY_CLIENT' | 'CANCELLED' | 'REJECTED';
export type OfferSubmissionAction = 'SENT' | 'ACCEPTED_BY_CLIENT' | 'REJECTED_BY_CLIENT' | 'REVISED_TO_DRAFT' | 'CANCELLED';
export type ProjectStatus = 'PLANNING' | 'IN_PROGRESS' | 'ON_HOLD' | 'COMPLETED' | 'CANCELLED';
export type GithubRepoStatus = 'NOT_CREATED' | 'CREATED' | 'FAILED';

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

export interface OfferLineItemResponse {
  id: UUID;
  description: string;
  quantity: number;
  unitPrice: number;
  taxRate: number | null;
  lineSubtotal: number;
  lineTaxAmount: number;
  lineTotal: number;
  sortOrder: number;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface OfferResponse {
  id: UUID;
  requestId: UUID;
  title: string;
  description: string | null;
  priceAmount: number | null;
  taxRate: number | null;
  currency: string | null;
  subtotalAmount: number | null;
  taxAmount: number | null;
  totalAmount: number | null;
  recipientEmail: string;
  recipientName: string | null;
  publicToken: string;
  revisionNumber: number;
  sentAt: string | null;
  respondedAt: string | null;
  rejectionNote: string | null;
  status: OfferStatus;
  active: boolean;
  validUntil: string | null;
  lineItems: OfferLineItemResponse[];
  createdAt: string | null;
  updatedAt: string | null;
}

export interface OfferSubmissionResponse {
  id: UUID;
  offerId: UUID;
  revisionNumber: number;
  action: OfferSubmissionAction;
  note: string | null;
  recipientEmail: string | null;
  createdAt: string | null;
  createdBy: UUID | null;
}

export interface PublicOfferResponse {
  token: string;
  status: OfferStatus;
  expired: boolean;
  revisionNumber: number;
  recipientName: string | null;
  sentAt: string | null;
  respondedAt: string | null;
  rejectionNote: string | null;
  offer: {
    title: string;
    description: string | null;
    priceAmount: number | null;
    currency: string | null;
    subtotalAmount: number | null;
    taxRate: number | null;
    taxAmount: number | null;
    totalAmount: number | null;
    validUntil: string | null;
    lineItems: OfferLineItemResponse[];
  };
  project: {
    name: string;
    description: string | null;
  };
}

export interface ProjectResponse {
  id: UUID;
  requestId: UUID;
  offerId: UUID;
  name: string;
  description?: string;
  status: ProjectStatus;
  ownerUserId?: UUID;
  githubRepoOwner?: string;
  githubRepoName?: string;
  githubRepoUrl?: string;
  githubRepoStatus?: GithubRepoStatus;
  githubLastError?: string | null;
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
