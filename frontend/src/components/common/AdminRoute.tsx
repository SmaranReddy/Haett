import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { LoadingFallback } from '@/components/feedback';
import { ROUTES } from '@/utils/constants';

export function AdminRoute() {
  const { isAuthenticated, isHydrated, role } = useAuthStore();

  if (!isHydrated) {
    return <LoadingFallback message="Restoring session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.PARTNER} replace />;
  }

  if (role !== 'ADMIN') {
    return <Navigate to={ROUTES.PARTNER} replace />;
  }

  return <Outlet />;
}
