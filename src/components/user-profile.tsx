'use client';

import { useQueryClient } from '@tanstack/react-query';
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
import { getCurrentUser } from '@/services/user-service';

import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

export default function UserProfile() {
  const { user } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const pathname = usePathname();

  const handleLogout = async () => {
    logout();

    if (!publicRoutes.includes(pathname)) {
      router.push('/');
    }
    await getCurrentUser();
    queryClient.invalidateQueries({ queryKey: ['ME'] });
  };

  console.log(user);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.avatar} alt={user?.name} />
          <AvatarFallback>
            <User2 />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Link href={`/${user?._id}`}>My Profile</Link>
        </DropdownMenuItem>
        {user?.role === 'user' && (
          <DropdownMenuItem>
            <Link href={'/my-posts'}>Dashboard</Link>
          </DropdownMenuItem>
        )}
        {user?.role === 'admin' && (
          <div>
            <DropdownMenuItem>
              <Link href={'/admin/dashboard'}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={'/change-password'}>Change password</Link>
            </DropdownMenuItem>
          </div>
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
