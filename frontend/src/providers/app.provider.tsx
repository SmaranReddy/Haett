import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'sonner';
import { QueryProvider } from './query.provider';
import { ErrorBoundary } from '@/components/feedback';
import type { ReactNode } from 'react';

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <QueryProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
            }}
          />
        </QueryProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
