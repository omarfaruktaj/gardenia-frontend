'use client';

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

  const handleFavoriteToggle = async () => {
    if (!currentUser) {
      return router.push('/login');
    }
    const result = await toggleFavorite(post._id);

    if (result.error) {
      toast.error(result.error.message);
    }

    if (result.data) {
      console.log(result.data);
      queryClient.invalidateQueries({
        queryKey: ['ME'],
      });
      queryClient.invalidateQueries({
        queryKey: ['FAVORITE_POSTS'],
      });
    }
  };

  const userFavoritedPosts = currentUser?.favorites?.map(
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
        <MdOutlineFavorite className="h-5 w-5" />
      ) : (
        <MdFavoriteBorder className="h-5 w-5" />
      )}
    </Button>
  );
}
