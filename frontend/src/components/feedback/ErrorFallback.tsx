import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui';
import { cn } from '@/lib/utils';

interface ErrorFallbackProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorFallback({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  className,
}: ErrorFallbackProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-red-200 bg-gradient-to-br from-red-50 to-red-50/50 p-12 text-center',
        className,
      )}
      role="alert"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-red-100 text-red-500 ring-1 ring-inset ring-red-200/50">
        <AlertTriangle className="h-6 w-6" />
      </div>
      <h3 className="text-base font-semibold text-red-800">{title}</h3>
      <p className="mt-1.5 text-sm text-red-600">{message}</p>
      {onRetry && (
        <Button variant="secondary" className="mt-6" onClick={onRetry}>
          <RefreshCw className="h-4 w-4 mr-1.5" />
          Try again
        </Button>
      )}
    </div>
  );
}
