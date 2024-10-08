import CreatePostButton from '@/components/post/create-post-button';
import PostCard from '@/components/post/post-card';
import api from '@/config/axios';
import { PostResponse } from '@/types';

export default async function Home() {
  const posts = await api.get('/posts');
  console.log(posts.data);

  return (
    <div>
      welcome to Gardenia
      <div>
        <CreatePostButton />
        {posts.data.data.map((post: PostResponse) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
