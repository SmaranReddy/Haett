import { Skeleton } from '@/components/ui';

export function AdminSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Skeleton className="mb-6 h-8 w-48 rounded-lg" />

      <div className="mb-8 inline-flex gap-1 rounded-xl bg-surface-tertiary p-1.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-10 w-24 rounded-lg" />
        ))}
      </div>

      <div className="space-y-5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-gray-200/70 bg-white p-6 shadow-md shadow-black/[0.04]">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-5 w-48 rounded-lg" />
                <Skeleton className="h-4 w-32 rounded-lg" />
              </div>
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
              <Skeleton className="h-4 w-full rounded-lg" />
            </div>
            <div className="mt-5 flex gap-3">
              <Skeleton className="h-9 w-24 rounded-lg" />
              <Skeleton className="h-9 w-24 rounded-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
