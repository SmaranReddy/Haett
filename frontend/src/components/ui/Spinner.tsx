import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-5 w-5',
  lg: 'h-7 w-7',
} as const;

interface SpinnerProps {
  size?: keyof typeof sizes;
  className?: string;
}

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <Loader2
      className={cn('animate-spin text-brand-500', sizes[size], className)}
      role="status"
      aria-label="Loading"
    />
  );
}
