import apiClient from './client';
import type { ApiResponse, PartnerApplication, ApprovalResult, DiscountCode } from '@/types';

export interface AdminDiscountCode extends DiscountCode {
  application: {
    businessName: string;
    user: { name: string; email: string };
  };
}

export const adminApi = {
  getAllApplications: (status?: string) => {
    const params = status ? { status } : {};
    return apiClient.get<ApiResponse<PartnerApplication[]>>('/admin/partner-applications', { params }).then((res) => res.data.data!);
  },

  approveApplication: (id: string) =>
    apiClient.patch<ApiResponse<ApprovalResult>>(`/admin/partner-applications/${id}/approve`).then((res) => res.data.data!),

  rejectApplication: (id: string, reason: string) =>
    apiClient.patch<ApiResponse<PartnerApplication>>(`/admin/partner-applications/${id}/reject`, { reason }).then((res) => res.data.data!),

  toggleDiscountCode: (id: string) =>
    apiClient.patch<ApiResponse<DiscountCode>>(`/admin/discount-codes/${id}/toggle`).then((res) => res.data.data!),

  getAllDiscountCodes: () =>
    apiClient.get<ApiResponse<AdminDiscountCode[]>>('/admin/discount-codes').then((res) => res.data.data!),
};
