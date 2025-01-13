import { Suspense } from 'react';

import FeedPostList from '@/components/post/feed-post-list';
import SearchBar from '@/components/searchbar';
import PostFilterSkeleton from '@/components/skeleton/post-filter-skeleton';
import { Separator } from '@/components/ui/separator';

export default function Home() {
  return (
    <div className="p-4 lg:p-6 ">
      <div className="lg:hidden mb-6">
        <Suspense fallback={<PostFilterSkeleton />}>
          {/* <PostFilter /> */}
          <SearchBar />
        </Suspense>
      </div>

      <h1 className="text-2xl font-semibold text-primary">
        Gardening Tips & Advice
      </h1>
      <p className="my-3 text-muted-foreground">
        Explore the latest gardening tips and advice shared by the community.
      </p>
      <Separator className="mb-4" />

      <Suspense fallback={<p>Loading...</p>}>
        <FeedPostList />
      </Suspense>
    </div>
  );
}
