'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { FaHeartBroken } from 'react-icons/fa';

import InfiniteScrollContainer from '@/components/infinitive-scroll-container';
import PostCard from '@/components/post/post-card';
import PostCardSkeleton from '@/components/skeleton/post-card-skeleton';
import { fetchFavoritePosts } from '@/services/favorite-service';
import { ISinglePost } from '@/types';

export default function FavoritePostList({ userId }: { userId: string }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['FAVORITE_POSTS', userId],
    queryFn: ({ pageParam = 1 }) => fetchFavoritePosts({ pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.pagination?.next ?? null,
  });

  const favorites = data?.pages.flatMap((page) => page.posts) || [];
  const posts = favorites.map((item) => item.post);

  if (status === 'pending') {
    return (
      <section className="grid grid-cols-1   gap-6 mt-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (status === 'success' && !posts.length && !hasNextPage) {
    return (
      <div className="flex  flex-col items-center justify-center mt-6 text-center">
        <FaHeartBroken className="h-16 w-16 text-primary mb-4" />
        <p className="text-lg font-semibold">No Favorite Posts Yet</p>
        <p className="text-muted-foreground">
          It looks like you haven&apos;t Bookmark any posts. Start exploring and
          adding your favorites!
        </p>
      </div>
    );
  }

  if (status === 'error') {
    return <p className="mt-4">An error occurred while fetching followers.</p>;
  }

  return (
    <InfiniteScrollContainer
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      <div className="grid grid-cols-1 gap-4">
        {posts.length > 0 &&
          posts.map((post: ISinglePost) => (
            <PostCard key={post?._id} post={post} />
          ))}
      </div>
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
