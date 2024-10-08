'use client';

import { Heart } from 'lucide-react';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { toggleFavorite } from '@/services/post-service';
import { ISinglePost, UserResponse } from '@/types';

import { Button } from '../ui/button';

export default function FavoriteButton({
  post,
  currentUser,
}: {
  post: ISinglePost;
  currentUser: UserResponse;
}) {
  const handleFavoriteToggle = async () => {
    const result = await toggleFavorite(post._id);

    if (result.error) {
      toast.error(result.error.message);
    }
  };

  const userFavoritedPosts = currentUser?.favorites.map(
    (favorite) => favorite.post
  );

  const isUserFavorited = userFavoritedPosts?.includes(post._id);

  return (
    <Button
      onClick={handleFavoriteToggle}
      variant={'ghost'}
      size={'icon'}
      className={cn(
        'inline-flex items-center justify-center p-2  rounded-full transition-colors',
        isUserFavorited ? ' text-primary hover:text-primary' : ''
      )}
      aria-label={
        isUserFavorited ? 'Remove from favorites' : 'Add to favorites'
      }
    >
      {isUserFavorited ? (
        <FaHeart className="h-5 w-5" />
      ) : (
        <Heart className="h-5 w-5" />
      )}
    </Button>
  );
}
