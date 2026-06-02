import { useQuery } from '@tanstack/react-query';
import { publicApi } from '@/api/public.api';

const STATS_QUERY_KEY = ['platform-stats'];

export function usePlatformStats() {
  return useQuery({
    queryKey: STATS_QUERY_KEY,
    queryFn: publicApi.getPlatformStats,
    staleTime: 60_000,
    retry: 2,
  });
}
