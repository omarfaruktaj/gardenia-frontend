'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PostBackButton() {
  const router = useRouter();

  return (
    <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border flex items-center h-14 px-4">
      <button
        onClick={() => router.back()}
        className="p-2 rounded-full hover:bg-muted transition"
        aria-label="Go back"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <h1 className="text-lg font-semibold ml-4">Post</h1>
    </div>
  );
}
