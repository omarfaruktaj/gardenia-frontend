import PostButton from '@/components/post/create-post-button';
import PostCard from '@/components/post/post-card';
import api from '@/config/axios';
import { ISinglePost } from '@/types';

export default async function Home() {
  const posts = await api.get('/posts/feed');
  console.log(posts.data);

  return (
    <div>
      <PostButton />
      <div className="grid grid-cols-1 gap-4">
        {posts.data.data.map((post: ISinglePost) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
