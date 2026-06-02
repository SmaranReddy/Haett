import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { partnerApi } from '@/api';
import { getApiError } from '@/lib/utils';
import { QUERY_KEYS } from '@/utils/constants';
import { useAuthStore } from '@/store/auth.store';
import { toast } from 'sonner';
import type { PartnerApplication, CreateApplicationRequest, ReapplyRequest } from '@/types';

export function useMyApplication() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  return useQuery<PartnerApplication | null>({
    queryKey: QUERY_KEYS.MY_APPLICATION,
    queryFn: async () => {
      try {
        return await partnerApi.getMyApplication();
      } catch (error: unknown) {
        const axiosError = error as { response?: { status?: number } };
        if (axiosError.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: isAuthenticated,
    retry: (failureCount, error) => {
      const axiosError = error as { response?: { status?: number } };
      if (axiosError.response?.status === 404) return false;
      return failureCount < 1;
    },
  });
}

export function useCreateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateApplicationRequest) => partnerApi.createApplication(data),
    onSuccess: () => {
      toast.success('Application submitted successfully');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_APPLICATION });
    },
    onError: (error) => {
      const message = getApiError(error);
      if (message.includes('already')) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_APPLICATION });
      }
      toast.error(message);
    },
  });
}

export function useReapply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReapplyRequest) => partnerApi.reapply(data),
    onSuccess: () => {
      toast.success('Application resubmitted successfully');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_APPLICATION });
    },
    onError: (error) => {
      toast.error(getApiError(error));
    },
  });
}
