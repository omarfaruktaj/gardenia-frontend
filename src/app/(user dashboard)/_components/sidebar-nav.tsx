'use client';

import { Book, BookMarked, Tag, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export default function SidebarNav() {
  const pathName = usePathname();
  const routes = [
    {
      path: '/dashboard/my-post',
      label: 'My Posts',
      icon: Book,
    },
    {
      path: '/dashboard/saved',
      label: 'Saved Posts',
      icon: BookMarked,
    },
    {
      path: '/dashboard/followers',
      label: 'Followers',
      icon: User,
    },
    {
      path: '/dashboard/following',
      label: 'Following',
      icon: Tag,
    },
  ];

  return (
    <nav className="flex flex-col gap-1 items-start px-2 py-2 font-medium lg:px-4 text-muted-foreground">
      {routes.map(({ path, label, icon: Icon }) => (
        <Link
          key={path}
          href={path}
          className={cn(
            'flex items-center gap-3 w-full rounded-lg px-3 py-2 transition-colors duration-200',
            pathName === path
              ? 'text-primary font-semibold bg-secondary'
              : 'hover:text-primary hover:bg-secondary'
          )}
          aria-current={pathName === path ? 'page' : undefined}
        >
          <Icon className="h-4 w-4" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  );
}
