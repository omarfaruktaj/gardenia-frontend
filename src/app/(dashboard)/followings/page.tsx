import { Heading } from '@/components/ui/heading';
import getLoginUser from '@/lib/get-login-user';

import FollowingList from '../_components/following-list';

export default async function Followings() {
  const user = await getLoginUser();

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
