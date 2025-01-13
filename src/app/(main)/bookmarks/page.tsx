import { redirect } from 'next/navigation';

import FavoritePostList from '@/app/(dashboard)/_components/favorite-post-list';
import { Heading } from '@/components/ui/heading';
import { getCurrentUser } from '@/services/user-service';

export default async function Favorites() {
  const user = await getCurrentUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="mt-6 p-4 lg:p-6 ">
      <Heading title="Bookmarks" description="Manage your Bookmarks" />
      <div className="mt-6 ">
        <FavoritePostList userId={user?._id} />
      </div>
    </div>
  );
}
