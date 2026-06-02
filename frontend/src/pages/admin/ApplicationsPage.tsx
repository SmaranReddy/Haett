import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';

export default function AdminApplicationsPage() {
  return <Navigate to={ROUTES.PARTNER} replace />;
}
