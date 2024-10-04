import React from 'react';

import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = React.memo(
  ({ className = '', ...props }) => {
    return (
      <div
        className={cn(
          'animate-pulse rounded-lg bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20',
          'shadow-sm',
          className
        )}
        aria-busy="true"
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

export { Skeleton };
