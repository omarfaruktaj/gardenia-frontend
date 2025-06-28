'use client';

import { useEffect, useState } from 'react';

import { TooltipArrow } from '@radix-ui/react-tooltip';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { MdFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { toast } from 'sonner';

import { useUser } from '@/context/user-provider';
import { cn } from '@/lib/utils';
import { toggleFavorite } from '@/services/post-service';
import { ISinglePost } from '@/types';

import { Button } from '../ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';

export default function FavoriteButton({ post }: { post: ISinglePost }) {
  const { user: currentUser } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isFavorited, setIsFavorited] = useState<boolean>(false);
  const [isPending, setIsPending] = useState(false);
  // Sync state with user data on mount
  useEffect(() => {
    if (currentUser?.favorites) {
      const userFavoritedPosts = currentUser.favorites.map(
        (favorite) => favorite.post
      );
      setIsFavorited(userFavoritedPosts.includes(post._id));
    }
  }, [currentUser, post._id]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isPending) {
        event.preventDefault();
        event.returnValue = ''; // Some browsers require this to show a confirmation dialog
        return 'Are you sure you want to leave? Your changes may not be saved.';
      }
    };

    if (isPending) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isPending]);

  const handleFavoriteToggle = async () => {
    if (!currentUser) {
      return router.push('/login');
    }

    setIsPending(true);
    // Optimistic update
    setIsFavorited((prev) => !prev);

    const result = await toggleFavorite(post._id);
    setIsPending(false);
    if (result.error) {
      // Revert on error
      toast.error(result.error.message);
      setIsFavorited((prev) => !prev);
      return;
    }

    // Revalidate queries after mutation
    queryClient.invalidateQueries({ queryKey: ['ME'] });
    queryClient.invalidateQueries({ queryKey: ['FAVORITE_POSTS'] });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={handleFavoriteToggle}
            variant="ghost"
            size="icon"
            className={cn(
              'inline-flex items-center justify-center p-2 rounded-full transition-colors',
              isFavorited ? 'text-primary hover:text-primary' : ''
            )}
            aria-label={
              isFavorited ? 'Remove from favorites' : 'Add to favorites'
            }
          >
            {isFavorited ? (
              <MdOutlineFavorite className="h-5 w-5" />
            ) : (
              <MdFavoriteBorder className="h-5 w-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-black text-white px-2 py-1 text-sm rounded shadow-md"
        >
          {isFavorited ? 'Remove from favorites' : 'Add to favorites'}
          <TooltipArrow className="fill-black" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
