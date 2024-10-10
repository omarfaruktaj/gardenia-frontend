'use client';

import { Separator } from '@radix-ui/react-select';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';

export default function ProfileNotFound() {
  const router = useRouter();

  return (
    <div className="overflow-hidden lg:mx-auto max-w-4xl border-x min-h-screen">
      <div className=" w-full py-3 px-2">
        <div className="flex items-center gap-3 ">
          <Button
            onClick={() => router.back()}
            variant={'ghost'}
            size={'icon'}
            className="rounded-full"
          >
            <ArrowLeft />
          </Button>
          Back
        </div>
      </div>
      <div className="relative w-full h-56 bg-gray-200">
        <div className="flex items-center justify-center h-full">
          <h1 className="text-3xl font-bold text-muted-foreground">
            User Not Found
          </h1>
        </div>
      </div>

      <div className="px-3 md:px-6 py-2">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center -mt-16">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-muted bg-gray-300" />
          </div>

          <div className="h-10 w-32 bg-gray-300 rounded" />
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-x-2 mb-1">
            <h2 className="text-lg text-muted-foreground">User not found.</h2>
          </div>
          <p className="text-center text-sm text-muted-foreground mb-4">
            The profile you are looking for does not exist or has been removed.
          </p>

          <div className="flex items-center text-xs md:text-sm text-muted-foreground mb-6 space-x-3">
            <div className="h-5 w-5 bg-gray-300 rounded" />
            <div className="h-4 w-24 bg-gray-300 rounded" />
          </div>

          <div className="flex space-x-6 text-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-300 rounded" />
              <div className="h-4 w-24 bg-gray-300 rounded" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="h-5 w-5 bg-gray-300 rounded" />
              <div className="h-4 w-24 bg-gray-300 rounded" />
            </div>
          </div>
        </div>
      </div>
      <Separator />
    </div>
  );
}
