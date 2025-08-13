import UserProfile from '@/components/user-profile';

import MobileSidebar from './mobile-sidebar';

export default function TopBar() {
  return (
    <header className="flex h-14 items-center justify-between md:justify-end gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 fixed top-0 left-0 right-0 z-50">
      <MobileSidebar />
      <UserProfile />
    </header>
  );
}
