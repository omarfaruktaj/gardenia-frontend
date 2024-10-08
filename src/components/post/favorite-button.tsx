'use client';

import { useRouter } from 'next/navigation';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
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
  const router = useRouter();

  const handleFavoriteToggle = async () => {
    if (!currentUser) {
      return router.push('/login');
    }
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
        <IoBookmark className="h-5 w-5" />
      ) : (
        <IoBookmarkOutline className="h-5 w-5" />
      )}
    </Button>
  );
}
