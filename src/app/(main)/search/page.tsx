import { Suspense } from 'react';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import FeedPostList from '@/components/post/feed-post-list';
import SearchBar from '@/components/searchbar';
import PostFilterSkeleton from '@/components/skeleton/post-filter-skeleton';
import { Button } from '@/components/ui/button';
import getLoginUser from '@/lib/get-login-user';

export default async function Home() {
  const user = await getLoginUser();
  if (!user) return redirect('/login');
  return (
    <div className="p-4 lg:p-6 ">
      <div className=" mb-6 flex items-center space-x-4">
        <Button variant={'link'} size={'icon'} className="rounded-full" asChild>
          <Link href={'/'}>
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div className="w-full">
          <Suspense fallback={<PostFilterSkeleton />}>
            <SearchBar />
          </Suspense>
        </div>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <FeedPostList />
      </Suspense>
    </div>
  );
}
