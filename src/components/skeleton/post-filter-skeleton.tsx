import { Skeleton } from '../ui/skeleton';

export default function PostFilterSkeleton() {
  return (
    <div className="w-full">
      <div className="mb-6">
        <Skeleton className="h-10 rounded-full" />
      </div>

      <div className="space-y-4 border p-4 rounded-2xl">
        <Skeleton className="h-6 w-1/2" />

        <div>
          <div className="pb-3 inline-block">
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-full rounded" />
        </div>

        <div>
          <div className="pb-3 inline-block">
            <Skeleton className="h-4 w-32" />
          </div>
          <Skeleton className="h-10 w-full rounded" />
        </div>
      </div>
    </div>
  );
}
