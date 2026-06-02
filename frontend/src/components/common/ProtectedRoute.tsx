import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/store/auth.store';
import { LoadingFallback } from '@/components/feedback';

interface ProtectedRouteProps {
  requiredRole?: 'USER' | 'ADMIN';
}

export function ProtectedRoute({ requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, isHydrated, role } = useAuthStore();

  if (!isHydrated) {
    return <LoadingFallback message="Restoring session..." />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
