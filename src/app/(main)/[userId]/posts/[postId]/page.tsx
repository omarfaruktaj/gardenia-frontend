import SinglePost from '@/components/post/single-post';
import api from '@/config/axios';

export default async function Page({ params }: { params: { postId: string } }) {
  const post = await api.get(`/posts/${params.postId}`);

  return <SinglePost post={post.data.data} />;
}
