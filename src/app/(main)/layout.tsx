import { Suspense } from 'react';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';
import MainSidebar from '@/components/main-sidebar';
import SearchBar from '@/components/searchbar';
import PostFilterSkeleton from '@/components/skeleton/post-filter-skeleton';
import ToFollow from '@/components/to-follow';
import getLoginUser from '@/lib/get-login-user';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoginUser();

  if (!user) return '/login';

  return (
    <div>
      <Navbar />
      <div className="container mx-auto bg-background ">
        <div className="relative mt-1">
          <div className="mx-auto flex flex-col lg:flex-row">
            <div className="hidden lg:flex lg:flex-col lg:w-3/12 p-4  sticky top-20 h-screen">
              <div className="space-y-6">
                <MainSidebar />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-grow min-h-screen lg:w-5/6 border-x border-b">
              {children}
            </div>

            {/* Right Sidebar */}
            <div className="hidden lg:flex lg:flex-col lg:w-2/6 p-4  sticky top-10 h-screen ">
              <div className="space-y-6">
                <Suspense fallback={<PostFilterSkeleton />}>
                  <SearchBar />
                  {/* <Discover /> */}
                  {/* <PostFilter /> */}
                </Suspense>
                <div className="mt-6">
                  {/* <QuotesComponent /> */}
                  <ToFollow />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
