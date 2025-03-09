import { Heading } from '@/components/ui/heading';
import { getCurrentUser } from '@/services/user-service';

import FollowingList from '../_components/following-list';

export default async function Followings() {
  const user = await getCurrentUser();

  return (
    <div>
      <Heading
        title="Followings"
        description="View and manage your Followings."
      />
      <FollowingList user={user!} />
    </div>
  );
}
