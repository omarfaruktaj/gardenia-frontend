import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import FollowButton from '@/components/follow-button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LoggedInUser, UserResponse } from '@/types';

import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card';

interface UserCardProps {
  user: UserResponse;
  currentUser: LoggedInUser;
}

export default function UserCard({ user, currentUser }: UserCardProps) {
  return (
    <Card
      className={cn(
        'border-0 rounded-md bg-transparent',
        user._id === currentUser._id && 'hidden'
      )}
    >
      <CardHeader className="p-2">
        <div className="flex items-center justify-between">
          <HoverCard openDelay={1000}>
            <HoverCardTrigger>
              <div className="flex items-center mb-4 sm:mb-0">
                <Link href={`/${user?._id}`}>
                  <Avatar>
                    <AvatarImage
                      src={user?.avatar}
                      alt={`${user?.name}'s avatar`}
                    />
                    <AvatarFallback>{user?.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                </Link>

                <div className="ml-4">
                  <Link href={`/${user?._id}`}>
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-base">{user?.name}</CardTitle>
                      {user?.isVerified && (
                        <BadgeCheck className="h-5 w-5 text-primary mt-1" />
                      )}
                    </div>
                    <CardDescription>{user?.username}</CardDescription>
                  </Link>
                </div>
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 p-4">
              <div className="flex items-start gap-4">
                <Image
                  src={user.avatar || '/default-avatar.png'}
                  alt={`${user.name}'s avatar`}
                  width={48}
                  height={48}
                  className="rounded-full h-16 w-16 object-cover"
                />
                <div>
                  <h4 className="text-sm font-semibold leading-none">
                    {user.name}
                    {user.isVerified && (
                      <span className="ml-1 text-blue-500">✔️</span>
                    )}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    @{user.username}
                  </p>
                  <p className="mt-1 text-sm">{user.bio}</p>
                </div>
              </div>
              <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                <div>
                  <strong>{user.followers.length}</strong> Followers
                </div>
                <div>
                  <strong>{user.following.length}</strong> Following
                </div>
                {typeof user.posts === 'number' && (
                  <div>
                    <strong>{user.posts}</strong> Posts
                  </div>
                )}
              </div>
              {user.verificationEligible && !user.isVerified && (
                <div className="mt-2 text-xs text-green-600 font-medium">
                  Eligible for verification
                </div>
              )}
            </HoverCardContent>
          </HoverCard>
          {!(user?._id === currentUser?._id) && (
            <FollowButton user={user} currentUser={currentUser} />
          )}
        </div>
      </CardHeader>
    </Card>
  );
}
