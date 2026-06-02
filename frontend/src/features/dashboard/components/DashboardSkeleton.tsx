import { Skeleton } from '@/components/ui';

export function DashboardSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 animate-fade-in">
      <Skeleton className="mb-2 h-8 w-64 rounded-lg" />
      <Skeleton className="mb-8 h-5 w-48 rounded-lg" />

      <div className="mb-8 grid gap-5 sm:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 rounded-xl border border-gray-200/70 bg-white p-6 card-shadow">
            <Skeleton className="h-12 w-12 shrink-0 rounded-xl" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-3 w-20 rounded-lg" />
              <Skeleton className="h-7 w-16 rounded-lg" />
            </div>
          </div>
        ))}
      </div>

      <Skeleton className="mb-5 h-6 w-32 rounded-lg" />
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between rounded-xl border border-gray-200/70 bg-white p-6 card-shadow">
            <div className="space-y-2">
              <Skeleton className="h-4 w-40 rounded-lg" />
              <Skeleton className="h-3 w-60 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-20 rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
