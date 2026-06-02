import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { adminApi } from '@/api';
import { getApiError } from '@/lib/utils';
import { QUERY_KEYS } from '@/utils/constants';
import { toast } from 'sonner';
import type { PartnerApplication, DiscountCode } from '@/types';

export function useAllApplications(status?: string) {
  return useQuery<PartnerApplication[]>({
    queryKey: [...QUERY_KEYS.ALL_APPLICATIONS, status],
    queryFn: () => adminApi.getAllApplications(status),
  });
}

export function useApproveApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminApi.approveApplication(id),
    onSuccess: () => {
      toast.success('Application approved successfully');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_APPLICATIONS });
    },
    onError: (error) => {
      toast.error(getApiError(error));
    },
  });
}

export function useRejectApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) =>
      adminApi.rejectApplication(id, reason),
    onSuccess: () => {
      toast.success('Application rejected');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_APPLICATIONS });
    },
    onError: (error) => {
      toast.error(getApiError(error));
    },
  });
}

export function useToggleDiscountCode() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminApi.toggleDiscountCode(id),
    onSuccess: (data: DiscountCode) => {
      toast.success(data.active ? 'Discount code activated' : 'Discount code deactivated');
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ALL_APPLICATIONS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.DASHBOARD });
    },
    onError: (error) => {
      toast.error(getApiError(error));
    },
  });
}
