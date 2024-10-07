/* eslint-disable quotes */
import { format } from 'date-fns';
import { BadgeCheck, Calendar, UserPlus, Users } from 'lucide-react';
import Image from 'next/image';

import FollowButton from '@/components/follow-button';
import { Separator } from '@/components/ui/separator';
import {
  fetchSingleUserWithVerificationEligible,
  getCurrentUser,
} from '@/services/user-service';
import { UserResponse } from '@/types';

import GetVerifiedButton from './get-verified-button';
import ProfileBack from './profile-back';
import ProfileNav from './profile-nav';
import ProfileUpdateButton from './profile-update-button';

export default async function Profile({ userId }: { userId: string }) {
  const currentUser = await getCurrentUser();
  const user = (await fetchSingleUserWithVerificationEligible(
    userId
  )) as UserResponse;

  const fallbackProfilePic =
    'https://via.placeholder.com/150/27272a/27272a?text=No+Image';
  const fallbackCoverPic =
    'https://via.placeholder.com/600x200/3f3f46/3f3f46?text=No+Cover+Image';

  const joinedDate = format(new Date(user.createdAt), 'MMMM yyyy');
  const bioMessage = user.bio
    ? user.bio
    : user._id === currentUser?._id
      ? "You haven't added a bio yet."
      : "This user hasn't added a bio yet.";

  return (
    <div className="overflow-hidden">
      <ProfileBack user={user} />
      <div className="relative w-full h-56">
        <Image
          src={user.cover || fallbackCoverPic}
          alt="Cover image"
          width={500}
          height={200}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="px-3 md:px-6 py-2 ">
        <div className="relative flex items-center justify-between">
          <div className="flex items-center -mt-16">
            <Image
              src={user.avatar || fallbackProfilePic}
              alt={`${user.name}'s profile`}
              width={100}
              height={100}
              className="w-24  h-24 md:w-32 md:h-32 rounded-full border-4 border-muted shadow-md"
            />
          </div>

          {user._id === currentUser?._id ? (
            <ProfileUpdateButton />
          ) : (
            <FollowButton currentUser={currentUser} user={user} />
          )}
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-x-2 mb-1">
            <h1 className="text-xl sm:text-2xl  font-bold leading-tight truncate">
              {user.name}
            </h1>
            {user.isVerified ? (
              <BadgeCheck className="h-5 w-5 text-primary mt-1" />
            ) : user.verificationEligible ? (
              <GetVerifiedButton />
            ) : null}
          </div>
          <p className="text-muted-foreground text-sm md:text-base">
            @{user.username}
          </p>

          <p className="mt-2 mb-4 text-sm md:text-base text-balance">
            {bioMessage}
          </p>

          <div className="flex items-center text-xs md:text-sm text-muted-foreground mb-6 space-x-3">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <p>Joined {joinedDate}</p>
          </div>

          <div className="flex space-x-6 text-center mb-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm md:text-base">
                {user.followers.length} followers
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5 text-muted-foreground" />
              <p className="text-sm md:text-base">
                {user.following.length} following
              </p>
            </div>
          </div>
        </div>
      </div>
      <ProfileNav userId={userId} />
      <Separator />
    </div>
  );
}
