import CommunityCard from '@/components/community-card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import api from '@/config/axios';
import getLoginUser from '@/lib/get-login-user';
import { UserResponse } from '@/types';

export default async function Communities() {
  const user = await getLoginUser();

  const response = await api.get('/users');
  const data = response.data;
  const userData = data?.data;
  return (
    <div className="px-4 py-8">
      <div className="space-y-4 ">
        <Heading title="Communities" />
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
