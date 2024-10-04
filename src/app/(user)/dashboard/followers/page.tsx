import { Heading } from '@/components/ui/heading';
import api from '@/config/axios';
import { getCurrentUser } from '@/services/user-service';
import { TUserExtended } from '@/types';

import UserCard from '../../_components/user-card';

export default async function Followers() {
  const user = await getCurrentUser();

  const response = await api.get(`/users/${user?._id}/followers`);
  const data = response.data.data;

  return (
    <div>
      <Heading
        title="Followers"
        description="View and manage your followers."
      />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {data.map((follower: TUserExtended) => (
          <UserCard key={follower._id} user={follower} showButtons />
        ))}
      </section>
    </div>
  );
}
