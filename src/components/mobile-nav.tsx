'use client';

import type { LucideIcon } from 'lucide-react';
import {
  BookmarkIcon,
  Flower as FlowerIcon,
  HomeIcon,
  PlusIcon,
  UserIcon,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Badge } from '@/components/ui/badge';
import { useUser } from '@/context/user-provider';
import { cn } from '@/lib/utils';

import PostButton from './post/create-post-button';

export function MobileBottomNav() {
  const pathname = usePathname();
  const { user } = useUser();

  type NavItem = {
    icon: LucideIcon;
    label: string;
    href: string;
    badge?: number | null;
    isAction?: boolean;
  };

  const navItems: NavItem[] = [
    {
      icon: HomeIcon,
      label: 'Home',
      href: '/',
      badge: null,
    },
    {
      icon: Users,
      label: 'Communities',
      href: '/communities',
      badge: null,
    },
    {
      icon: PlusIcon,
      label: 'Post',
      href: '#',
      isAction: true,
    },
    {
      icon: FlowerIcon,
      label: 'Garden',
      href: '/garden-journal',
      badge: null,
    },
    {
      icon: BookmarkIcon,
      label: 'Bookmarks',
      href: '/bookmarks',
      badge: null,
    },
    {
      icon: UserIcon,
      label: 'Profile',
      href: `/${user?._id}`,
      badge: null,
    },
  ];

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border sm:hidden">
        <div className="flex items-center justify-around h-16 px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (item.isAction) {
              return <PostButton key={item.href} />;
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  'flex flex-col items-center justify-center flex-1 h-full relative transition-colors',
                  isActive
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                )}
                aria-label={item.label}
              >
                <div className="relative">
                  <Icon
                    className={cn(
                      'h-6 w-6 transition-all',
                      isActive && 'scale-110'
                    )}
                  />
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="absolute -top-2 -right-2 h-4 w-4 flex items-center justify-center p-0 text-[10px] bg-primary text-primary-foreground border-2 border-background rounded-full"
                    >
                      {item.badge > 9 ? '9+' : item.badge}
                    </Badge>
                  )}
                </div>
                <span
                  className={cn(
                    'text-[10px] mt-1 font-medium',
                    isActive && 'font-semibold'
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
