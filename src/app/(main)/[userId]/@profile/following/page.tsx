import { getCurrentUser } from '@/services/user-service';

import FollowingList from '../../_components/following-list';

export default async function Following({
  params,
}: {
  params: { userId: string };
}) {
  const currentUser = await getCurrentUser();

  return (
    <div className="px-3">
      <FollowingList userId={params.userId} currentUser={currentUser!} />
    </div>
  );
}
