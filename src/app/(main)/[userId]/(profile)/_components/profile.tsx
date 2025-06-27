/* eslint-disable quotes */
import { format } from 'date-fns';
import { BadgeCheck, Calendar, UserPlus, Users } from 'lucide-react';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import FollowButton from '@/components/follow-button';
import { Separator } from '@/components/ui/separator';
import getLoginUser from '@/lib/get-login-user';
import { fetchSingleUserWithVerificationEligible } from '@/services/user-service';
import { UserResponse } from '@/types';

import GetVerifiedButton from './get-verified-button';
import ProfileBack from './profile-back';
import ProfileNav from './profile-nav';
import ProfileUpdateButton from './profile-update-button';

export default async function Profile({ userId }: { userId: string }) {
  const currentUser = await getLoginUser();
  const user = (await fetchSingleUserWithVerificationEligible(
    userId
  )) as UserResponse;

  if (!currentUser) {
    redirect('/login');
  }
  if (!user) {
    return <p>No user found</p>;
  }

  const fallbackProfilePic =
    'https://via.placeholder.com/150/27272a/27272a?text=No+Image';
  const fallbackCoverPic =
    'https://via.placeholder.com/600x200/3f3f46/3f3f46?text=No+Cover+Image';

  const joinedDate = format(new Date(user?.createdAt), 'MMMM yyyy');
  const bioMessage = user.bio
    ? user.bio
    : user._id === currentUser?._id
      ? "You haven't added a bio yet."
      : "This user hasn't added a bio yet.";
  console.log('User Avatar:', user.avatar);
  console.log('User Cover:', user.cover);

  return (
    <div className="overflow-hidden">
      <ProfileBack user={user} />
      <div className="relative w-full h-48 sm:h-64 md:h-72 overflow-hidden">
        <Image
          src={user.cover || fallbackCoverPic}
          alt="Cover image"
          width={1200}
          height={400}
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-700"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80  to-transparent" />
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
              priority
            />
          </div>

          {user._id === currentUser?._id ? (
            <ProfileUpdateButton />
          ) : (
            <FollowButton currentUser={currentUser} user={user} />
          )}
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-x-2 mb-2">
            <h1 className="text-2xl sm:text-3xl font-semibold truncate">
              {user.name}
            </h1>
            {user.isVerified ? (
              <BadgeCheck className="h-5 w-5 text-primary" />
            ) : user.verificationEligible ? (
              <GetVerifiedButton />
            ) : null}
          </div>

          <p className="text-muted-foreground text-sm sm:text-base mb-1">
            @{user.username}
          </p>

          {bioMessage && (
            <p className="mt-2 text-sm sm:text-base text-muted-foreground leading-relaxed">
              {bioMessage}
            </p>
          )}

          <div className="flex items-center gap-x-2 text-sm text-muted-foreground mt-4 mb-6">
            <Calendar className="h-4 w-4" />
            <span>Joined {joinedDate}</span>
          </div>

          <div className="flex space-x-6 text-sm sm:text-base text-muted-foreground">
            <div className="flex items-center gap-x-2">
              <Users className="h-5 w-5" />
              <span>{user.followers.length} followers</span>
            </div>
            <div className="flex items-center gap-x-2">
              <UserPlus className="h-5 w-5" />
              <span>{user.following.length} following</span>
            </div>
          </div>
        </div>
      </div>
      <ProfileNav userId={userId} />
      <Separator />
    </div>
  );
}
