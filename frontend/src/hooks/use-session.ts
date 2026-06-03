import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { authApi } from '@/api';
import { useAuthStore } from '@/store/auth.store';
import { queryClient } from '@/providers/query.provider';
import { redirect } from '@/lib/navigation';
import { QUERY_KEYS, ROUTES } from '@/utils/constants';

export function useSessionValidation() {
  const { isAuthenticated, token, setUser, logout, isHydrated } = useAuthStore();
  const validatedRef = useRef(false);

  const { isError, isSuccess, data } = useQuery({
    queryKey: QUERY_KEYS.USER_PROFILE,
    queryFn: async () => {
      validatedRef.current = true;
      return authApi.getProfile();
    },
    enabled: isHydrated && isAuthenticated && !!token && !validatedRef.current,
    retry: false,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (isSuccess && data) {
      setUser(data);
    }
  }, [isSuccess, data, setUser]);

  useEffect(() => {
    if (isError && validatedRef.current) {
      logout();
      queryClient.clear();
      redirect(ROUTES.PARTNER);
    }
  }, [isError, logout]);

  return {
    isValidating: isHydrated && isAuthenticated && !!token && !validatedRef.current,
  };
}
