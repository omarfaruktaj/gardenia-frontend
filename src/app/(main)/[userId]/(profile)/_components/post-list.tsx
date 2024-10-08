'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import InfiniteScrollContainer from '@/components/infinitive-scroll-container';
import PostCard from '@/components/post/post-card';
import { UserCardSkeleton } from '@/components/skeleton/user-card-skeleton';
import { fetchUserPosts } from '@/services/post-service';
import { ISinglePost } from '@/types';

export default function PostList({ userId }: { userId: string }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['followers', userId],
    queryFn: ({ pageParam = 1 }) =>
      fetchUserPosts({ userId: userId, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.pagination?.next ?? null,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === 'pending') {
    return (
      <section className="grid grid-cols-1   gap-6 mt-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (status === 'success' && !posts.length && !hasNextPage) {
    return <p className="mt-4">There is no follower.</p>;
  }

  if (status === 'error') {
    return <p className="mt-4">An error occurred while fetching followers.</p>;
  }

  console.log(posts);

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
