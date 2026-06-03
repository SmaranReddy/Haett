import axios from 'axios';
import { useAuthStore } from '@/store/auth.store';
import { queryClient } from '@/providers/query.provider';
import { redirect } from '@/lib/navigation';
import { ROUTES } from '@/utils/constants';

const apiClient = axios.create({
  baseURL: '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      useAuthStore.getState().logout();
      queryClient.clear();
      redirect(ROUTES.PARTNER);
    }
    return Promise.reject(error);
  },
);

export default apiClient;
