import { redirect } from 'next/navigation';

import getLoginUser from '@/lib/get-login-user';

import FollowerList from '../../_components/followers-list';

export default async function Followers({
  params,
}: {
  params: { userId: string };
}) {
  const currentUser = await getLoginUser();
  if (!currentUser) {
    redirect('/login');
  }
  return (
    <div className="px-3">
      <FollowerList userId={params.userId} currentUser={currentUser!} />
    </div>
  );
}
