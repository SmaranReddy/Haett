import apiClient from './client';
import type { ApiResponse, DashboardResponse } from '@/types';

export const dashboardApi = {
  getDashboard: () =>
    apiClient.get<ApiResponse<DashboardResponse>>('/partner-dashboard').then((res) => res.data.data!),
};
