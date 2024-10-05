import { Heading } from '@/components/ui/heading';

import FollowingList from '../_components/following-list';

export default async function Followings() {
  return (
    <div>
      <Heading
        title="Followings"
        description="View and manage your Followings."
      />
      <FollowingList />
    </div>
  );
}
