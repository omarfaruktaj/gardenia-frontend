'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Loader2 } from 'lucide-react';
import { FaUsers } from 'react-icons/fa';

import UserCard from '@/components/follow-card';
import InfiniteScrollContainer from '@/components/infinitive-scroll-container';
import { UserCardSkeleton } from '@/components/skeleton/user-card-skeleton';
import { fetchFollowers } from '@/services/user-service';
import { LoggedInUser, UserResponse } from '@/types';

export default function FollowerList({
  userId,
  currentUser,
}: {
  userId: string;
  currentUser: LoggedInUser;
}) {
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
      fetchFollowers({ userId: userId, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.pagination?.next ?? null,
  });

  const followers = data?.pages.flatMap((page) => page.followers) || [];

  if (status === 'pending') {
    return (
      <section className="grid grid-cols-1   gap-6 mt-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <UserCardSkeleton key={index} />
        ))}
      </section>
    );
  }

  if (status === 'success' && !followers.length && !hasNextPage) {
    return (
      <div className="flex flex-col  items-center justify-center mt-6 text-center">
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
      <section className="grid grid-cols-1 gap-4 mt-4">
        {followers?.map((follower: UserResponse) => (
          <UserCard
            key={follower?._id}
            user={follower}
            currentUser={currentUser}
          />
        ))}
      </section>
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
