import DashboardLogo from '@/components/dashboard-logo';

import SidebarNav from './sidebar-nav';

export default function Sidebar() {
  return (
    <div className="hidden  bg-background md:block">
      <div className="flex h-full max-h-screen flex-col gap-2 fixed top-0 left-0 bg-background border-r">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <DashboardLogo />
        </div>
        <div className="flex-1">
          <SidebarNav />
        </div>
      </div>
    </div>
  );
}
