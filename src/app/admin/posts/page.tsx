import PostList from '../_components/post-list';

export default function Posts() {
  return (
    <div className="py-10">
      <div className="flex items-start justify-between pb-8">
        <h1 className="text-2xl font-bold">Posts</h1>
      </div>
      <PostList />
    </div>
  );
}
