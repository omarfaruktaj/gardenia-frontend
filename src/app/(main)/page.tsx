import { Suspense } from 'react';

import { redirect } from 'next/navigation';

import CreatePostCard from '@/components/create-post-card';
import FeedPostList from '@/components/post/feed-post-list';
import SearchBar from '@/components/searchbar';
import PostFilterSkeleton from '@/components/skeleton/post-filter-skeleton';
import getLoginUser from '@/lib/get-login-user';

export default async function Home() {
  const user = await getLoginUser();
  if (!user) return redirect('/login');
  return (
    <>
      <div className="sticky top-0 bg-background z-50 p-4 lg:p-4 pb-0">
        <div className="">
          <div className="lg:hidden mb-4 pb-2">
            <Suspense fallback={<PostFilterSkeleton />}>
              {/* <PostFilter /> */}
              <SearchBar />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="p-4 lg:p-6">
        <CreatePostCard user={user} />
        <Suspense fallback={<p>Loading...</p>}>
          <FeedPostList />
        </Suspense>
      </div>
    </>
  );
}
