import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const ResetPasswordFormSkeleton = () => {
  return (
    <Card className="p-6 space-y-8">
      <div className="space-y-4">
        <div>
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-10 mt-2" />
        </div>
        <div>
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-10 mt-2" />
        </div>
      </div>

      <div className="mt-4">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="mt-4 text-center text-sm text-muted-foreground">
        <Skeleton className="h-5 w-1/3 mx-auto" />
      </div>
    </Card>
  );
};
