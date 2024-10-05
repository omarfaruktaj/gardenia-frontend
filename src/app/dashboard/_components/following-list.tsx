'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';

import UserCard from '@/components/follow-card';
import InfiniteScrollContainer from '@/components/infinitive-scroll-container';
import { UserCardSkeleton } from '@/components/skeleton/user-card-skeleton';
import { useUser } from '@/context/user-provider';
import { fetchFollowing } from '@/services/user-service';
import { TUserExtended } from '@/types';

export default function FollowingList() {
  const { user, isLoading: isUserLoading } = useUser();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['followings', user?._id],
    queryFn: ({ pageParam = 1 }) =>
      fetchFollowing({ userId: user?._id as string, pageParam, limit: 1 }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.pagination?.next ?? null,
  });

  const followings = data?.pages?.flatMap((page) => page.following) || [];

  if (status === 'pending' || isUserLoading) {
    return (
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (status === 'success' && followings.length === 0 && !hasNextPage) {
    return <p className="mt-4">You have no followings.</p>;
  }

  if (status === 'error') {
    return (
      <p className=" mt-4">An error occurred while fetching followings.</p>
    );
  }

  return (
    <InfiniteScrollContainer
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {followings.map((following: TUserExtended) => (
          <UserCard key={following?._id} user={following} currentUser={user!} />
        ))}
      </section>
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
