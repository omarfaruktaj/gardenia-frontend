import { BadgeCheck } from 'lucide-react';
import Link from 'next/link';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { UserResponse } from '@/types';

interface UserCardProps {
  user: UserResponse;
  currentUser: UserResponse;
}

export default function CommunityCard({ user, currentUser }: UserCardProps) {
  return (
    <Card
      className={cn(
        'border rounded-md bg-transparent shadow-none',
        user._id === currentUser._id && 'hidden'
      )}
    >
      <CardHeader className="p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            <Link href={`/${user?._id}`}>
              <Avatar className="rounded-md">
                <AvatarImage
                  className="rounded-md"
                  src={user?.avatar}
                  alt={`${user?.name}'s avatar`}
                />
                <AvatarFallback className="rounded-md">
                  {user?.name.slice(0, 2)}
                </AvatarFallback>
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
                <p className="text-sm text-muted-foreground mt-1">
                  {user?.bio}
                </p>
              </Link>
            </div>
          </div>
          {/* {!(user?._id === currentUser?._id) && (
            <FollowButton user={user} currentUser={currentUser} />
          )} */}
        </div>
      </CardHeader>
    </Card>
  );
}
