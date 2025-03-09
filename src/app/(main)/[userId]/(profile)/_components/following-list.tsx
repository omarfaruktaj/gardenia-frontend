'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { FaUserPlus } from 'react-icons/fa';

import UserCard from '@/components/follow-card';
import InfiniteScrollContainer from '@/components/infinitive-scroll-container';
import { UserCardSkeleton } from '@/components/skeleton/user-card-skeleton';
import { fetchFollowing } from '@/services/user-service';
import { TUser, UserResponse } from '@/types';

export default function FollowingList({
  userId,
  currentUser,
}: {
  userId: string;
  currentUser: TUser;
}) {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['followings', userId],
    queryFn: ({ pageParam = 1 }) =>
      fetchFollowing({ userId: userId, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.pagination?.next ?? null,
  });

  const followings = data?.pages?.flatMap((page) => page.following) || [];

  if (status === 'pending') {
    return (
      <section className="grid grid-cols-1 gap-4 mt-4">
        {Array.from({ length: 9 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (status === 'success' && followings.length === 0 && !hasNextPage) {
    return (
      <div className="flex  flex-col items-center justify-center mt-6 text-center">
        <FaUserPlus className="h-16 w-16 text-primary mb-4" />
        <p className="text-lg font-semibold">You have no followings.</p>
        <p className="text-muted-foreground">
          It looks like you aren&apos;t following anyone yet. Start exploring
          and connect with others!
        </p>
      </div>
    );
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
      <section className="grid grid-cols-1 gap-4 mt-4">
        {followings.map((following: UserResponse) => (
          <UserCard
            key={following?._id}
            user={following}
            currentUser={currentUser!}
          />
        ))}
      </section>
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
