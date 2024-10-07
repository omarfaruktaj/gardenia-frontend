import { getCurrentUser } from '@/services/user-service';

import FollowerList from '../../_components/followers-list';

export default async function Followers({
  params,
}: {
  params: { userId: string };
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="px-3">
      <FollowerList userId={params.userId} currentUser={currentUser!} />
    </div>
  );
}