'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { cn } from '@/lib/utils';

import { Button } from './button';

interface HeadingProps {
  title: string;
  description?: string;
  isLanding?: boolean;
  back?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  title,
  description,
  isLanding = false,
  back = false,
}) => {
  const router = useRouter();

  return (
    <div>
      <div className="flex item-center gap-2">
        {back && (
          <Button
            onClick={() => router.back()}
            variant={'ghost'}
            size={'icon'}
            className="rounded-full"
          >
            <ArrowLeft />
          </Button>
        )}
        <div>
          <h2
            className={cn(
              ' font-bold tracking-tight',
              isLanding ? 'text-xl' : 'text-3xl'
            )}
          >
            {title}
          </h2>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};
