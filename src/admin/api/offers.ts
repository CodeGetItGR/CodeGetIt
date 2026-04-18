import { apiClient } from '@/admin/api/client';
import type { OfferResponse, OfferStatus, PagedResponse, UUID } from '@/admin/types';

export interface OfferListQuery {
  page?: number;
  size?: number;
  sort?: string;
  status?: OfferStatus;
  requestId?: UUID;
}

export interface CreateOfferPayload {
  requestId: UUID;
  title: string;
  description?: string;
  priceAmount?: number;
  currency?: string;
  validUntil?: string;
}

export interface UpdateOfferPayload {
  title: string;
  description?: string;
  priceAmount?: number;
  currency?: string;
  validUntil?: string;
}

interface OfferStatusPayload {
  targetStatus: OfferStatus;
  reason?: string;
}

export const offerApi = {
  list: async (query: OfferListQuery) => {
    const { data } = await apiClient.get<PagedResponse<OfferResponse>>('/offers', { params: query });
    return data;
  },

  getById: async (id: UUID) => {
    const { data } = await apiClient.get<OfferResponse>(`/offers/${id}`);
    return data;
  },

  create: async (payload: CreateOfferPayload) => {
    const { data } = await apiClient.post<OfferResponse>('/offers', payload);
    return data;
  },

  update: async (id: UUID, payload: UpdateOfferPayload) => {
    const { data } = await apiClient.put<OfferResponse>(`/offers/${id}`, payload);
    return data;
  },

  changeStatus: async (id: UUID, payload: OfferStatusPayload) => {
    const { data } = await apiClient.patch<OfferResponse>(`/offers/${id}/status`, payload);
    return data;
  },

  accept: async (id: UUID) => {
    const { data } = await apiClient.post<OfferResponse>(`/offers/${id}/accept`);
    return data;
  },

  cancel: async (id: UUID, reason?: string) => {
    const { data } = await apiClient.post<OfferResponse>(`/offers/${id}/cancel`, reason ? { reason } : {});
    return data;
  },
};
