import apiClient from './client';

export interface PlatformStats {
  totalApprovedPartners: number;
  totalDiscountCodes: number;
  totalCodeUses: number;
  totalSavingsGiven: number;
  pendingApplications: number;
}

export const publicApi = {
  getPlatformStats: () =>
    apiClient.get<{ success: boolean; message: string; data: PlatformStats }>('/public/platform-stats')
      .then((res) => res.data.data!),
};
