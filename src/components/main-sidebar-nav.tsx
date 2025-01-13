'use client';

import {
  BookmarkIcon,
  CameraIcon,
  ClipboardListIcon,
  HomeIcon,
  InfoIcon,
  MailIcon,
  Settings,
  UserIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { useUser } from '@/context/user-provider';

export default function MainSidebarNav() {
  const pathname = usePathname();
  const { user } = useUser();

  const menuItems = [
    { icon: HomeIcon, label: 'Home', href: '/' },
    { icon: BookmarkIcon, label: 'Bookmarks', href: '/bookmarks' },
    { icon: ClipboardListIcon, label: 'Lists', href: '/lists' },
    { icon: UserIcon, label: 'Profile', href: `/${user?._id}` },
    { icon: CameraIcon, label: 'Gallery', href: '/gallery' },
    { icon: InfoIcon, label: 'About Us', href: '/about' },
    { icon: MailIcon, label: 'Contact Us', href: '/contact' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];
  return (
    <nav className="flex-grow">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.label}>
            <Link href={item.href} passHref>
              <span
                className={`flex items-center px-4 py-2 hover:bg-muted rounded-full transition-colors ${
                  pathname === item.href
                    ? 'font-bold bg-muted text-primary'
                    : ''
                }`}
              >
                <item.icon className="h-6 w-6 mr-4" />
                <span>{item.label}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
