import { HeadingSkeleton } from '@/components/skeleton/heading-skeleton';
import PostCardSkeleton from '@/components/skeleton/post-card-skeleton';

export default function Loading() {
  return (
    <>
      <HeadingSkeleton />

      <section className="grid  gap-6 mt-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <PostCardSkeleton key={index} />
        ))}
      </section>
    </>
  );
}
