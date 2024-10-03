import { AlignLeft } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import Logo from '../logo';
import { Button } from '../ui/button';
import MainNav from './main-nav';

export default function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={'icon'} variant="ghost">
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
          <MainNav />
        </div>
      </SheetContent>
    </Sheet>
  );
}
