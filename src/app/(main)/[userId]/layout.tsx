import { redirect } from 'next/navigation';

import {
  fetchSingleUserWithVerificationEligible,
  getCurrentUser,
} from '@/services/user-service';
import { UserResponse } from '@/types';

import ProfileNotFound from './(profile)/_components/profile-not-found';

export default async function UserLayout({
  children,
  params: { userId },
}: {
  children: React.ReactNode;
  params: { userId: string };
}) {
  const currentUser = await getCurrentUser();
  const user = (await fetchSingleUserWithVerificationEligible(
    userId
  )) as UserResponse;

  if (!currentUser) {
    redirect('/login');
  }

  if (!user) {
    return <ProfileNotFound />;
  }

  return <div>{children}</div>;
}
