import { Skeleton, SkeletonCard } from '@/components/ui';

export function ApplicationSkeleton() {
  return (
    <div className="mx-auto flex min-h-screen max-w-xl flex-col items-center justify-center px-6 animate-fade-in">
      <Skeleton className="mb-8 h-10 w-64 rounded-lg" />
      <Skeleton className="mb-4 h-4 w-80 rounded-lg" />
      <SkeletonCard />
      <div className="mt-8 w-full space-y-4">
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-12 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
    </div>
  );
}
