import PostList from '@/app/(main)/[userId]/(profile)/_components/post-list';
import { Heading } from '@/components/ui/heading';
import { getCurrentUser } from '@/services/user-service';

export default async function MyPosts() {
  const user = await getCurrentUser();

  return (
    <div className="p-6 ">
      <Heading title="My Posts" description="Manage your posts" />
      <div className="mt-6 max-w-4xl">
        <PostList userId={user._id} />
      </div>
    </div>
  );
}
