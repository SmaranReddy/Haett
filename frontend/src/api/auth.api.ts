import apiClient from './client';
import type { ApiResponse, AuthResponse, LoginRequest, RegisterRequest } from '@/types';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/login', data).then((res) => res.data.data!),

  adminLogin: (data: LoginRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/admin/login', data).then((res) => res.data.data!),

  register: (data: RegisterRequest) =>
    apiClient.post<ApiResponse<AuthResponse>>('/auth/register', data).then((res) => res.data.data!),

  getProfile: () =>
    apiClient.get<ApiResponse<AuthResponse['user']>>('/users/me').then((res) => res.data.data!),
};
