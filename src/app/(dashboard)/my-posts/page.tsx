import PostList from '@/app/(main)/[userId]/(profile)/_components/post-list';
import PostButton from '@/components/post/create-post-button';
import { Heading } from '@/components/ui/heading';
import { getCurrentUser } from '@/services/user-service';

export default async function MyPosts() {
  const user = await getCurrentUser();

  return (
    <div className="p-6 ">
      <div className="flex items-center justify-between max-w-4xl">
        <Heading title="My Posts" description="Manage your posts" />
        <PostButton />
      </div>
      <div className="mt-6 max-w-4xl">
        <PostList userId={user._id} />
      </div>
    </div>
  );
}
