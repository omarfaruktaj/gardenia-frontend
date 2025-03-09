'use client';

import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className=" flex flex-col items-center justify-center p-4 bg-red-100 text-red-800 rounded-md">
      <h2 className="text-lg font-bold">Something went wrong!</h2>
      <p className="mt-2 text-sm">
        {error.message || 'An unexpected error occurred.'}
      </p>
      <Button onClick={reset} className="">
        Try Again
      </Button>
    </div>
  );
}
