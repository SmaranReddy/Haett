import { Loader2 } from 'lucide-react';
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
      <Loader2 className="h-8 w-8 animate-spin text-brand-500" />
      <p className="mt-4 text-sm text-gray-500">{message}</p>
    </div>
  );
}
