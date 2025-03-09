import { Skeleton } from '@/components/ui/skeleton';

export const HeadingSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-8 w-3/4 mb-2 rounded" />
      <Skeleton className="h-4 w-full rounded" />
    </div>
  );
};
