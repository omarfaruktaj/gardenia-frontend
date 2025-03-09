import { Skeleton } from '@/components/ui/skeleton';

import { Card } from '../ui/card';

export const UserCardSkeleton = () => {
  return (
    <Card>
      <div className="flex p-3 items-center">
        <div className="flex items-center space-x-4 flex-1">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
        <div className="ml-3">
          <Skeleton className="h-8 w-20 rounded" />
        </div>
      </div>
    </Card>
  );
};
