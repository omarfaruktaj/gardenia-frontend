'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '../ui/button';

export default function PostBackButton() {
  const router = useRouter();
  return (
    <div className="flex items-center pl-0  w-full space-x-1 mt-3 ">
      <Button
        onClick={() => router.back()}
        variant="ghost"
        size={'icon'}
        className="rounded-full"
      >
        <ChevronLeft className="h-5 w-5" />
      </Button>
      <h4 className="text-xl">Post</h4>
    </div>
  );
}
