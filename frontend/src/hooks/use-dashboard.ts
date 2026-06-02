import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/api';
import { QUERY_KEYS } from '@/utils/constants';
import { useAuthStore } from '@/store/auth.store';
import type { DashboardResponse } from '@/types';

export function useDashboard() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const role = useAuthStore((s) => s.role);

  return useQuery<DashboardResponse>({
    queryKey: QUERY_KEYS.DASHBOARD,
    queryFn: () => dashboardApi.getDashboard(),
    enabled: isAuthenticated && role === 'USER',
  });
}
