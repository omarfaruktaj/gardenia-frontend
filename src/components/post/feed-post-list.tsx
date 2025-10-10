'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

import InfiniteScrollContainer from '@/components/infinitive-scroll-container';
import PostCard from '@/components/post/post-card';
import { fetchFeed } from '@/services/post-service';
import { ISinglePost } from '@/types';

import PostCardSkeleton from '../skeleton/post-card-skeleton';

export default function FeedPostList() {
  const params = useSearchParams();

  const searchTerm = params.get('searchTerm') || undefined;
  const category = params.get('category') || undefined;
  const sort = params.get('sort') || undefined;

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
          <PostCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (status === 'success' && !posts.length && !hasNextPage) {
    return (
      <div className="flex flex-col items-center justify-center mt-6 text-center">
        <p className="text-lg font-semibold">No Posts Yet!</p>
        <p className="text-muted-foreground">
          It looks like there aren&apos;t any posts available. Start creating
          and sharing your thoughts!
        </p>
      </div>
    );
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
      {!hasNextPage && posts.length > 0 && (
        <p className="mt-4 text-center">All posts have been loaded.</p>
      )}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
