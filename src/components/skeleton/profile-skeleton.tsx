import { Skeleton } from '../ui/skeleton';

export default function ProfileSkeleton() {
  return (
    <div className="overflow-hidden">
      <div className="relative w-full h-56">
        <Skeleton className="w-full h-full" />
      </div>

      <div className="px-3 md:px-6 py-2">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center -mt-16">
            <Skeleton className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-muted" />
          </div>

          <Skeleton className="h-10 w-32" />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-x-2 mb-1">
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-5 w-5" />
          </div>
          <Skeleton className="h-4 w-32" />
          <Skeleton className="mt-2 mb-4 h-3 w-full" />

          <div className="flex items-center text-xs md:text-sm text-muted-foreground mb-6 space-x-3">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="flex space-x-6 text-center mb-4">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex items-center space-x-2">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </div>
      <Skeleton className="h-10 w-48 mx-auto" />
      <Skeleton className="h-1 w-full mt-4" />
    </div>
  );
}
