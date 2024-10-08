'use client';

import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { UnfollowUser, followUser } from '@/services/user-service';
import { UserResponse } from '@/types';

import AlertModal from './ui/alert-model';
import { Button } from './ui/button';

interface UserCardProps {
  user: UserResponse;
  currentUser: UserResponse | null;
}

export default function FollowButton({ user, currentUser }: UserCardProps) {
  const [isMouseEntered, setMouseEnter] = useState(false);
  const [openModel, setOpenModel] = useState(false);

  const queryClient = useQueryClient();

  const isCurrentUserFollowing = currentUser
    ? user?.followers?.includes(currentUser._id)
    : false;

  const isUserFollowing = currentUser
    ? user?.following?.includes(currentUser._id)
    : false;

  const handleMouseEnter = () => setMouseEnter(true);
  const handleMouseLeave = () => setMouseEnter(false);

  const buttonText = isCurrentUserFollowing
    ? isMouseEntered
      ? 'Unfollow'
      : 'Following'
    : isUserFollowing
      ? 'Follow Back'
      : 'Follow';

  const handleFollowToggle = async () => {
    let result;

    if (isCurrentUserFollowing) {
      setOpenModel(true);
    } else {
      result = await followUser(user._id);
    }

    if (result?.error) {
      toast.error(result.message);
    }
    if (result?.message) {
      queryClient.invalidateQueries({
        queryKey: ['followers', currentUser?._id],
      });
      queryClient.invalidateQueries({
        queryKey: ['followings', currentUser?._id],
      });
      queryClient.invalidateQueries({
        queryKey: ['followings', user?._id],
      });
      queryClient.invalidateQueries({
        queryKey: ['followers', user?._id],
      });

      toast.success(result.message);
    }
  };

  const handleUnFollow = async () => {
    const result = await UnfollowUser(user._id);

    if (result.error) {
      toast.error(result.message);
    }
    if (result.message) {
      queryClient.invalidateQueries({
        queryKey: ['followers', currentUser?._id],
      });
      queryClient.invalidateQueries({
        queryKey: ['followings', currentUser?._id],
      });
      queryClient.invalidateQueries({
        queryKey: ['followings', user?._id],
      });
      queryClient.invalidateQueries({
        queryKey: ['followers', user?._id],
      });

      toast.success(result.message);
    }
  };

  return (
    <div>
      <AlertModal
        isOpen={openModel}
        onClose={() => setOpenModel(false)}
        onConfirm={handleUnFollow}
        title={`Unfollow ${user.username}`}
        actionButtonText="Unfollow"
        description="Their posts will no longer show up in your For You timeline. You can still view their profile, unless their posts are protected. "
      />
      <Button
        onClick={handleFollowToggle}
        variant={
          isCurrentUserFollowing
            ? isMouseEntered
              ? 'outlineDestructive'
              : 'outline'
            : 'default'
        }
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="transition-colors px-4 w-24 "
      >
        {buttonText}
      </Button>
    </div>
  );
}
