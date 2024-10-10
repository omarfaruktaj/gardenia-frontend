import { HeadingSkeleton } from '@/components/skeleton/heading-skeleton';
import PostCardSkeleton from '@/components/skeleton/post-card-skeleton';

export default function Loading() {
  return (
    <>
      <HeadingSkeleton />

      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </section>
    </>
  );
}
