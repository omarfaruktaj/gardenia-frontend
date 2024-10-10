'use client';

import { ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Button } from './button';

interface BackButtonProps {
  onClick?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onClick }) => {
  const router = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      router.back();
    }
  };

  return (
    <div className="mb-8 ">
      <div className="flex items-center pl-0  w-full space-x-2  ">
        <Button
          onClick={handleClick}
          variant="ghost"
          className="rounded-full"
          size={'icon'}
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
        <span>Back</span>
      </div>
    </div>
  );
};

export default BackButton;
