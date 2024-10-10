'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import InfiniteScrollContainer from '@/components/infinitive-scroll-container';
import PostCard from '@/components/post/post-card';
import { UserCardSkeleton } from '@/components/skeleton/user-card-skeleton';
import { fetchFeed } from '@/services/post-service';
import { ISinglePost } from '@/types';

export default function FeedPostList() {
  const params = useSearchParams();

  const searchTerm = params.get('searchTerm') || undefined;
  const category = params.get('category') || undefined;
  const sort = params.get('sort') || undefined;

  console.log(searchTerm);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['FEED_POSTS', searchTerm, category, sort],
    queryFn: ({ pageParam = 1 }) =>
      fetchFeed({ pageParam, searchTerm, category, sort }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.pagination?.next ?? null,
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === 'pending') {
    return (
      <section className="grid grid-cols-1 gap-6 mt-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (status === 'success' && !posts.length && !hasNextPage) {
    return <p className="mt-4">There are no posts.</p>;
  }

  if (status === 'error') {
    return <p className="mt-4">An error occurred while fetching posts.</p>;
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
