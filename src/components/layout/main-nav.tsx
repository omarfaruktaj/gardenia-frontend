'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

export default function MainNav() {
  const pathname = usePathname();

  const routes = [
    { label: 'Home', href: '/' },
    { label: 'News Feed', href: '/news-feed' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
  ];

  return (
    <div className="flex flex-col md:flex-row items-start space-y-2 md:space-y-0 md:space-x-4">
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          aria-label={route.label}
          className={cn(
            'text-white ',
            pathname === route.href
              ? 'font-bold text-yellow-300'
              : 'text-white opacity-80 hover:opacity-100 transition-opacity'
          )}
        >
          {route.label}
        </Link>
      ))}
    </div>
  );
}
