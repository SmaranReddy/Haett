import { AppProvider } from '@/providers/app.provider';
import { AppRoutes } from '@/routes';

export default function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}
