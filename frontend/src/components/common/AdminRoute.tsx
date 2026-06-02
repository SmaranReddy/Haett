import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { LoadingFallback } from '@/components/feedback';

export function AdminRoute() {
  const { isAuthenticated, isHydrated, role } = useAuthStore();

  if (!isHydrated) {
    return <LoadingFallback message="Restoring session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'ADMIN') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
