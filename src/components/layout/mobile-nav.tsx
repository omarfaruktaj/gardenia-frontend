import { AlignLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import MainSidebarNav from '../main-sidebar-nav';
import { Button } from '../ui/button';

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
              <Link
                href={'/'}
                className="text-xl font-bold p-1  cursor-pointer"
              >
                <div className="flex items-center justify-center gap-2">
                  <div>
                    <Image
                      src={'/static/logo.png'}
                      height={100}
                      width={100}
                      alt="logo"
                      className="h-10 w-10"
                    />
                  </div>
                  <div>Gardenia</div>
                </div>
              </Link>
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
