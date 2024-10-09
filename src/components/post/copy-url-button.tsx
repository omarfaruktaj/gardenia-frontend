'use client';

import { Link } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '../ui/button';

export default function CopyURLButton() {
  const copyUrlToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast.info('URL copied to clipboard!');
      })
      .catch((err) => {
        // console.error('Failed to copy: ', err);
      });
  };
  return (
    <Button
      variant={'ghost'}
      size={'icon'}
      className="rounded-full"
      onClick={copyUrlToClipboard}
    >
      <Link className=" h-5 w-5" />
    </Button>
  );
}
