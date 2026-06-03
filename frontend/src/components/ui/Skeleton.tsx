import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('rounded-md bg-gradient-to-r from-gray-100 via-gray-200/80 to-gray-100 bg-[length:200%_100%] animate-shimmer', className)}
      aria-hidden="true"
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-xl border border-gray-200/70 bg-white p-6 shadow-md shadow-black/[0.04]">
      <Skeleton className="mb-4 h-4 w-1/3" />
      <Skeleton className="mb-2 h-8 w-1/2" />
      <Skeleton className="h-3 w-2/3" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <Skeleton key={i} className="h-12 w-full rounded-lg" />
      ))}
    </div>
  );
}
