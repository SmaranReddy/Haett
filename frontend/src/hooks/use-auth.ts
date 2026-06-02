import { useMutation } from '@tanstack/react-query';
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
      if (result.user.role === 'ADMIN') {
        navigate(ROUTES.ADMIN_APPLICATIONS);
      } else {
        navigate(ROUTES.PARTNER_DASHBOARD);
      }
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
      navigate(ROUTES.PARTNER_APPLICATION);
    },
    onError: (error) => {
      toast.error(getApiError(error));
    },
  });
}

export function useLogout() {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();

  return () => {
    logout();
    navigate(ROUTES.LOGIN);
    toast.success('Logged out successfully');
  };
}
