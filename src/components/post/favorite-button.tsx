'use client';

import { useEffect, useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { MdFavoriteBorder, MdOutlineFavorite } from 'react-icons/md';
import { toast } from 'sonner';

import { useUser } from '@/context/user-provider';
import { cn } from '@/lib/utils';
import { toggleFavorite } from '@/services/post-service';
import { ISinglePost } from '@/types';

import { Button } from '../ui/button';

export default function FavoriteButton({ post }: { post: ISinglePost }) {
  const { user: currentUser } = useUser();
  const router = useRouter();
  const queryClient = useQueryClient();

  const [isFavorited, setIsFavorited] = useState<boolean>(false);

  // Sync state with user data on mount
  useEffect(() => {
    if (currentUser?.favorites) {
      const userFavoritedPosts = currentUser.favorites.map(
        (favorite) => favorite.post
      );
      setIsFavorited(userFavoritedPosts.includes(post._id));
    }
  }, [currentUser, post._id]);

  const handleFavoriteToggle = async () => {
    if (!currentUser) {
      return router.push('/login');
    }

    // Optimistic update
    setIsFavorited((prev) => !prev);

    const result = await toggleFavorite(post._id);

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
    <Button
      onClick={handleFavoriteToggle}
      variant="ghost"
      size="icon"
      className={cn(
        'inline-flex items-center justify-center p-2 rounded-full transition-colors',
        isFavorited ? 'text-primary hover:text-primary' : ''
      )}
      aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isFavorited ? (
        <MdOutlineFavorite className="h-5 w-5" />
      ) : (
        <MdFavoriteBorder className="h-5 w-5" />
      )}
    </Button>
  );
}
