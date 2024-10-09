import { Heading } from '@/components/ui/heading';
import { getCurrentUser } from '@/services/user-service';

import FavoritePostList from '../_components/favorite-post-list';

export default async function Bookmark() {
  const user = await getCurrentUser();

  return (
    <div className="p-6 ">
      <Heading title="My Bookmarks" description="Manage your Bookmarks" />
      <div className="mt-6 max-w-4xl">
        <FavoritePostList userId={user._id} />
      </div>
    </div>
  );
}
