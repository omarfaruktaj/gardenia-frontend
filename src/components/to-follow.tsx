import api from '@/config/axios';
import getLoginUser from '@/lib/get-login-user';
import { UserResponse } from '@/types';

import UserCard from './follow-card';

export default async function ToFollow() {
  const user = await getLoginUser();

  const response = await api.get('/users');
  const data = response.data;
  const userData = data?.data?.slice(0, 10);
  return (
    <div className="space-y-4 lg:border lg:p-4 lg:rounded-2xl">
      <h2 className="text-lg font-semibold mb-4">Who to follow</h2>
      <div className="flex flex-col space-y-4">
        {userData.map((follower: UserResponse) => (
          <UserCard key={follower?._id} user={follower} currentUser={user!} />
        ))}
      </div>
    </div>
  );
}
