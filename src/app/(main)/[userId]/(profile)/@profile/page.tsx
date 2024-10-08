import PostList from '../_components/post-list';

export default function Posts({ params }: { params: { userId: string } }) {
  return (
    <div className="m-2">
      <PostList userId={params.userId} />
    </div>
  );
}
