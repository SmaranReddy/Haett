import { Spinner } from '@/components/ui';
import { cn } from '@/lib/utils';

interface LoadingFallbackProps {
  message?: string;
  className?: string;
}

export function LoadingFallback({ message = 'Loading...', className }: LoadingFallbackProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-20',
        className,
      )}
    >
      <Spinner size="lg" />
      <p className="mt-4 text-sm text-gray-500">{message}</p>
    </div>
  );
}
