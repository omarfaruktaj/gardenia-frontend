'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { FaUsers } from 'react-icons/fa';

import UserCard from '@/components/follow-card';
import InfiniteScrollContainer from '@/components/infinitive-scroll-container';
import { UserCardSkeleton } from '@/components/skeleton/user-card-skeleton';
import { fetchFollowers } from '@/services/user-service';
import { TUser, UserResponse } from '@/types';

export default function FollowerList({ user }: { user: TUser }) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['followers', user._id],
    queryFn: ({ pageParam = 1 }) =>
      fetchFollowers({ userId: user._id, pageParam, limit: 1 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.pagination?.next ?? null,
  });

  const followers = data?.pages.flatMap((page) => page.followers) || [];

  if (status === 'pending') {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (status === 'success' && !followers.length && !hasNextPage) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center mt-6 text-center">
        <FaUsers className="h-16 w-16 text-primary mb-4" />
        <p className="text-lg font-semibold">You have no followers.</p>
        <p className="text-muted-foreground">
          It looks like you haven&apos;t gained any followers yet. Keep engaging
          to attract more!
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
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {followers.map((follower: UserResponse) => (
          <UserCard key={follower?._id} user={follower} currentUser={user!} />
        ))}
      </section>
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
