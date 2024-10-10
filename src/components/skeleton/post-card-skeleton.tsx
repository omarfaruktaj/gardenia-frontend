import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import { Avatar } from '../ui/avatar';
import { Badge } from '../ui/badge';

export default function PostCardSkeleton() {
  return (
    <Card className="flex flex-col p-4 border rounded-lg shadow-lg bg-transparent">
      <div className="flex-1 pr-0 md:pr-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Avatar>
              <Skeleton className="h-10 w-10 rounded-full" />
            </Avatar>
            <div className="ml-3">
              <div className="flex items-center gap-1">
                <Skeleton className="h-5 mb-1 w-32" />
                <Skeleton className="h-5 w-5" />
              </div>
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <div className="hidden md:block mt-2">
            <Badge>
              <Skeleton className="h-4 w-16" />
            </Badge>
          </div>
        </div>

        <Skeleton className="h-6 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-4" />

        <div className="flex items-center justify-between mt-4 text-muted-foreground">
          <div className="flex items-center">
            <Skeleton className="h-5 w-5 mr-1" />
            <Skeleton className="h-4 w-12 mr-6" />
            <Skeleton className="h-5 w-5 mr-1" />
            <Skeleton className="h-4 w-12" />
          </div>
          <div className="flex items-center">
            <Skeleton className="h-8 w-8 mr-2" />
            <Skeleton className="h-8 w-8" />
          </div>
        </div>
      </div>

      {/* <div className="flex-none w-full relative mt-4 md:mt-0">
        <Skeleton className="h-48 w-full rounded-lg" />
      </div> */}
    </Card>
  );
}
