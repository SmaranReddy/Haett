import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authApi } from '@/api';
import { useAuthStore } from '@/store/auth.store';
import { getApiError } from '@/lib/utils';
import type { LoginRequest, RegisterRequest } from '@/types';
import { ROUTES } from '@/utils/constants';

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (result) => {
      setAuth(result.user, result.token);
      toast.success('Login successful');
      navigate(result.user.role === 'ADMIN' ? ROUTES.ADMIN_DASHBOARD : ROUTES.PARTNER);
    },
    onError: (error) => {
      toast.error(getApiError(error));
    },
  });
}

export function useAdminLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.adminLogin(data),
    onSuccess: (result) => {
      setAuth(result.user, result.token);
      toast.success(`Welcome, ${result.user.name}`);
      navigate(ROUTES.ADMIN_DASHBOARD, { replace: true });
    },
    onError: (error) => {
      toast.error(getApiError(error));
    },
  });
}

export function useRegister() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (result) => {
      setAuth(result.user, result.token);
      toast.success('Account created successfully');
      navigate(result.user.role === 'ADMIN' ? ROUTES.ADMIN_DASHBOARD : ROUTES.PARTNER);
    },
    onError: (error) => {
      toast.error(getApiError(error));
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  return () => {
    logout();
    queryClient.clear();
    navigate(ROUTES.PARTNER, { replace: true });
    toast.success('Logged out successfully');
  };
}
