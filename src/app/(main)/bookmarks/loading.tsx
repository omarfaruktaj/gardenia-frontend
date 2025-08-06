import PostCardSkeleton from '@/components/skeleton/post-card-skeleton';
import { Heading } from '@/components/ui/heading';

export default function loading() {
  return (
    <div className="mt-6 p-4 lg:p-6 ">
      <Heading title="Bookmarks" description="Manage your Bookmarks" />
      <div className="mt-6 ">
        <section className="grid grid-cols-1   gap-6 mt-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </section>
      </div>
    </div>
  );
}
