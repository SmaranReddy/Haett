import apiClient from './client';
import type { ApiResponse, PartnerApplication, CreateApplicationRequest, ReapplyRequest } from '@/types';

export const partnerApi = {
  createApplication: (data: CreateApplicationRequest) =>
    apiClient.post<ApiResponse<PartnerApplication>>('/partner-applications', data).then((res) => res.data.data!),

  getMyApplication: () =>
    apiClient.get<ApiResponse<PartnerApplication>>('/partner-applications/me').then((res) => res.data.data!),

  reapply: (data: ReapplyRequest) =>
    apiClient.put<ApiResponse<PartnerApplication>>('/partner-applications/reapply', data).then((res) => res.data.data!),
};
