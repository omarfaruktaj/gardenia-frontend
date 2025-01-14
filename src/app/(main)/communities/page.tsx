import CommunityCard from '@/components/community-card';
import { Separator } from '@/components/ui/separator';
import api from '@/config/axios';
import { getCurrentUser } from '@/services/user-service';
import { UserResponse } from '@/types';

export default async function Communities() {
  const user = await getCurrentUser();

  const response = await api.get('/users');
  const data = response.data;
  const userData = data?.data;
  return (
    <div className="p-4">
      <div className="space-y-4 ">
        <h2 className="text-xl font-semibold mb-4">Communities</h2>
        <Separator />
        <div className="flex flex-col space-y-4">
          {userData.map((follower: UserResponse) => (
            <CommunityCard
              key={follower?._id}
              user={follower}
              currentUser={user!}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
