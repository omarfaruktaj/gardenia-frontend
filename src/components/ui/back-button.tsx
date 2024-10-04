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
    <div className="mb-8">
      <Button
        onClick={handleClick}
        variant="ghost"
        size="sm"
        className="flex items-center space-x-2  "
      >
        <ChevronLeft className="h-5 w-5" />
        <span>Back</span>
      </Button>
    </div>
  );
};

export default BackButton;
