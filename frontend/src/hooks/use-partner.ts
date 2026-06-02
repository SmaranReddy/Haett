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
    },
    onError: (error) => {
      const message = getApiError(error);
      if (message.includes('already')) {
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_APPLICATION });
      }
      toast.error(message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_APPLICATION });
    },
  });
}

export function useReapply() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ReapplyRequest) => partnerApi.reapply(data),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.MY_APPLICATION });

      const previous = queryClient.getQueryData<PartnerApplication | null>(QUERY_KEYS.MY_APPLICATION);

      if (previous) {
        queryClient.setQueryData<PartnerApplication>(QUERY_KEYS.MY_APPLICATION, {
          ...previous,
          status: 'PENDING',
          rejectionReason: null,
        });
      }

      return { previous };
    },
    onSuccess: () => {
      toast.success('Application resubmitted successfully');
    },
    onError: (error, _data, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEYS.MY_APPLICATION, context.previous);
      }
      toast.error(getApiError(error));
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MY_APPLICATION });
    },
  });
}
