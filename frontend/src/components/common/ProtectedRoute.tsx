import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { LoadingFallback } from '@/components/feedback';
import { ROUTES } from '@/utils/constants';

export function ProtectedRoute() {
  const { isAuthenticated, isHydrated, role } = useAuthStore();

  if (!isHydrated) {
    return <LoadingFallback message="Restoring session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.PARTNER} replace />;
  }

  if (role === 'ADMIN') {
    return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
  }

  return <Outlet />;
}
