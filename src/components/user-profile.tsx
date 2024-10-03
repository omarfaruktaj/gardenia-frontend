'use client';

import { LogOut, User2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/context/user-provider';
import { publicRoutes } from '@/routes';
import { logout } from '@/services/auth-service';

import { Avatar, AvatarFallback } from './ui/avatar';

export default function UserProfile() {
  const { user } = useUser();
  const router = useRouter();

  const pathname = usePathname();

  const handleLogout = () => {
    logout();

    if (!publicRoutes.includes(pathname)) {
      router.push('/');
    }
  };

  console.log(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>
            <User2 />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user?.role === 'user' && (
          <DropdownMenuItem>
            <Link href={'/dashboard'}>Dashboard</Link>
          </DropdownMenuItem>
        )}
        {user?.role === 'admin' && (
          <DropdownMenuItem>
            <Link href={'admin/dashboard'}>Dashboard</Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
