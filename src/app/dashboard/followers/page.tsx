import { Heading } from '@/components/ui/heading';
import { getCurrentUser } from '@/services/user-service';

import FollowerList from '../_components/followers-list';

export default async function Followers() {
  const user = await getCurrentUser();
  return (
    <div>
      <Heading
        title="Followers"
        description="View and manage your followers."
      />
      <FollowerList user={user!} />
    </div>
  );
}
