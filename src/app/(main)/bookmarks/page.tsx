import { redirect } from 'next/navigation';

import FavoritePostList from '@/app/(dashboard)/_components/favorite-post-list';
import { Heading } from '@/components/ui/heading';
import getLoginUser from '@/lib/get-login-user';

export default async function Favorites() {
  const user = await getLoginUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div>
      <div className="sticky top-0 bg-background p-4 lg:p-6 z-50">
        <Heading
          title="Bookmarks"
          description="Manage your Bookmarks"
          isLanding
        />
      </div>
      <div className="mt-6 px-4">
        <FavoritePostList userId={user?._id} />
      </div>
    </div>
  );
}
