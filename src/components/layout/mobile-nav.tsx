import { AlignLeft } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import Logo from '../logo';
import MainSidebarNav from '../main-sidebar-nav';
import { Button } from '../ui/button';

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={'icon'} variant="default">
          <AlignLeft />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-4">
          <SheetTitle>
            <div className="flex items-start mb-3">
              <Logo />
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="mp-10">
          {/* <MainNav /> */}
          <MainSidebarNav />
        </div>
      </SheetContent>
    </Sheet>
  );
}
