import { Suspense } from 'react';

import { default as Filter } from '@/components/post-filter';
import FeedPostList from '@/components/post/feed-post-list';
import Quotes from '@/components/quotes';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <div className="mx-auto max-w-6xl flex flex-col lg:flex-row ">
        <div className="flex-grow min-h-screen lg:w-3/6 p-4 lg:p-6 border-x border-b rounded-xl ">
          <div>
            <div className="lg:hidden mb-6">
              <Suspense fallback={<p>Loading</p>}>
                <Filter />
              </Suspense>
            </div>

            <h1 className="text-2xl font-bold ">Gardening Tips & Advice</h1>
            <p className="my-3">
              Explore the latest gardening tips and advice shared by the
              community.
            </p>

            <Suspense fallback={<p>Loading</p>}>
              <FeedPostList />
            </Suspense>
          </div>
        </div>

        <div className="hidden sticky top-10  h-screen lg:flex lg:flex-col lg:w-2/6 p-4 shadow-lg rounded-lg">
          <Suspense fallback={<p>Loading</p>}>
            <Filter />
          </Suspense>
          <div className="mt-6">
            <Quotes />
          </div>
        </div>
      </div>
    </div>
  );
}
