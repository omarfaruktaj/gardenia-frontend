'use client';

import { useState } from 'react';

import { toast } from 'sonner';

import { UserCardSkeleton } from '@/components/skeleton/user-card-skeleton';
import AlertModal from '@/components/ui/alert-model';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useUser } from '@/context/user-provider';
import { UnfollowUser, followUser } from '@/services/user-service';
import { TUserExtended } from '@/types';

interface UserCardProps {
  user: TUserExtended;
}

export default function UserCard({ user }: UserCardProps) {
  const [isMouseEntered, setMouseEnter] = useState(false);
  const [openModel, setOpenModel] = useState(false);
  const { user: currentUser, isLoading } = useUser();

  if (isLoading) {
    return <UserCardSkeleton />;
  }

  const isFollowing = currentUser
    ? user.followers.includes(currentUser._id)
    : false;
  const handleMouseEnter = () => setMouseEnter(true);
  const handleMouseLeave = () => setMouseEnter(false);

  const buttonText = isFollowing
    ? isMouseEntered
      ? 'Unfollow'
      : 'Following'
    : 'Follow';

  const handleFollowToggle = async () => {
    let result;

    if (isFollowing) {
      setOpenModel(true);
    } else {
      result = await followUser(user._id);
    }

    if (result?.error) {
      toast.error(result.message);
    }
    if (result?.message) {
      toast.success(result.message);
    }
  };

  const handleUnFollow = async () => {
    const result = await UnfollowUser(user._id);

    if (result.error) {
      toast.error(result.message);
    }
    if (result.message) {
      toast.success(result.message);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={openModel}
        onClose={() => setOpenModel(false)}
        onConfirm={handleUnFollow}
        title={`Unfollow ${user.username}`}
        description="Their posts will no longer show up in your For You timeline. You can still view their profile, unless their posts are protected. "
      />
      <Card>
        <CardHeader className="p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center mb-4 sm:mb-0">
              <Avatar>
                <AvatarImage src={user.avatar} alt={`${user.name}'s avatar`} />
                <AvatarFallback>{user.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <div className="ml-4">
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <CardDescription>{user.username}</CardDescription>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <Button
                onClick={handleFollowToggle}
                variant={
                  isFollowing
                    ? isMouseEntered
                      ? 'outlineDestructive'
                      : 'outline'
                    : 'default'
                }
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="transition-colors px-4 w-20 "
              >
                {buttonText}
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}
