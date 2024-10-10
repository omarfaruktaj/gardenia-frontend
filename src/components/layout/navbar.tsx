import Link from 'next/link';

import { getCurrentUser } from '@/services/user-service';

import Logo from '../logo';
import PostButton from '../post/create-post-button';
import { Button } from '../ui/button';
import UserProfile from '../user-profile';
import MainNav from './main-nav';
import MobileNav from './mobile-nav';

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <nav className="bg-green-600 dark:bg-green-800">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Logo />

        <div className="hidden md:flex items-center space-x-4">
          <MainNav />
        </div>

        <div className="flex items-center space-x-3">
          {user ? (
            <div className="flex items-center gap-4">
              <PostButton />
              <UserProfile />
            </div>
          ) : (
            <Button
              variant="outline"
              className="text-green-600 dark:text-green-300 rounded-full"
            >
              <Link href="/login">Login</Link>
            </Button>
          )}
          <div className="block md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </nav>
  );
}
