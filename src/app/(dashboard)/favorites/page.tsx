import { redirect } from 'next/navigation';

import { Heading } from '@/components/ui/heading';
import getLoginUser from '@/lib/get-login-user';

import FavoritePostList from '../_components/favorite-post-list';

export default async function Favorites() {
  const user = await getLoginUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="p-6 ">
      <Heading
        title="My Favorite Posts"
        description="Manage your favorite posts"
      />
      <div className="mt-6 max-w-4xl">
        <FavoritePostList userId={user?._id} />
      </div>
    </div>
  );
}
