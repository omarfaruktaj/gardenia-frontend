'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { UserResponse } from '@/types';

export default function ProfileBack({ user }: { user: UserResponse }) {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border w-full py-3 px-2">
      <div className="flex items-center gap-8 ">
        <Button
          onClick={() => router.back()}
          variant={'ghost'}
          size={'icon'}
          className="rounded-full"
        >
          <ArrowLeft />
        </Button>
        <div>
          <h1 className="text-xl font-bold leading-tight truncate">
            {user.name}
          </h1>
          <p className=" text-muted-foreground text-sm">{user.posts} posts</p>
        </div>
      </div>
    </div>
  );
}
