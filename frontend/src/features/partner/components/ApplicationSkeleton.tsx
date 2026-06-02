import { Skeleton, SkeletonCard } from '@/components/ui';

export function ApplicationSkeleton() {
  return (
    <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-4">
      <Skeleton className="mb-8 h-10 w-64" />
      <Skeleton className="mb-4 h-4 w-96" />
      <SkeletonCard />
      <div className="mt-8 w-full space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-24 w-full" />
      </div>
    </div>
  );
}
