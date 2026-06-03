import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setNavigate } from '@/lib/navigation';
import { AppProvider } from '@/providers/app.provider';
import { AppRoutes } from '@/routes';
import { SessionValidator } from '@/components/feedback';

function NavigateProvider() {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigate(navigate);
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <AppProvider>
      <NavigateProvider />
      <SessionValidator />
      <AppRoutes />
    </AppProvider>
  );
}
