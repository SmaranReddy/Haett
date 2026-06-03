import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { ReactNode } from 'react';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (failureCount >= 1) return false;
        const err = error as { response?: { status?: number } };
        if (err.response?.status && err.response.status < 500) return false;
        return true;
      },
      refetchOnWindowFocus: false,
      staleTime: 30 * 1000,
      refetchOnMount: true,
    },
    mutations: {
      retry: 0,
    },
  },
});

interface QueryProviderProps {
  children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
