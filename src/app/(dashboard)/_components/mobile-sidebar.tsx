import { Menu } from 'lucide-react';

import DashboardLogo from '@/components/dashboard-logo';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import SidebarNav from './sidebar-nav';

export default function MobileSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetTitle />
        <div className="flex items-center gap-2 text-lg font-semibold">
          <DashboardLogo />
        </div>
        <SidebarNav />
      </SheetContent>
    </Sheet>
  );
}
