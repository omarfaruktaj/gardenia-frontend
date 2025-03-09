'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export default function ProfileNav({ userId }: { userId: string }) {
  const pathName = usePathname();

  return (
    <nav className="px-3 md:px-6 mb-4 flex items-center gap-6">
      <Link
        href={`/${userId}`}
        className={cn(
          'py-1 transition duration-200 border-b-2',
          pathName === `/${userId}`
            ? 'border-primary text-primary'
            : 'border-transparent text-muted-foreground hover:border-secondary'
        )}
        aria-current={pathName === `/${userId}` ? 'page' : undefined}
      >
        Posts
      </Link>
      <Link
        href={`/${userId}/followers`}
        className={cn(
          'py-1 transition duration-200 border-b-2',
          pathName === `/${userId}/followers`
            ? 'border-primary text-primary'
            : 'border-transparent text-muted-foreground hover:border-secondary'
        )}
        aria-current={pathName === `/${userId}/followers` ? 'page' : undefined}
      >
        Followers
      </Link>
      <Link
        href={`/${userId}/following`}
        className={cn(
          'py-1 transition duration-200 border-b-2',
          pathName === `/${userId}/following`
            ? 'border-primary text-primary'
            : 'border-transparent text-muted-foreground hover:border-secondary'
        )}
        aria-current={pathName === `/${userId}/following` ? 'page' : undefined}
      >
        Following
      </Link>
    </nav>
  );
}
