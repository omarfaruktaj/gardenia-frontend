import { Suspense } from 'react';

import SearchBar from '@/components/searchbar';
import { AppSidebar } from '@/components/sidebar/app-sidebar';
import { ResponsiveLayoutWrapper } from '@/components/sidebar/responsive-layout-wrapper';
import PostFilterSkeleton from '@/components/skeleton/post-filter-skeleton';
import ToFollow from '@/components/to-follow';
import { SidebarInset } from '@/components/ui/sidebar';
import getLoginUser from '@/lib/get-login-user';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getLoginUser();
  if (!user) return '/login';

  return (
    <div className="min-h-screen bg-background container  mx-auto">
      {/* <Navbar /> */}
      <ResponsiveLayoutWrapper>
        <div className=" flex w-full ">
          <div className="h-screen sticky left-0 top-0 z-50 sm:p-3">
            <AppSidebar />
          </div>

          <SidebarInset className="flex-1 ">
            <div className="">
              <div className="relative">
                <div className="mx-auto flex flex-col lg:flex-row ">
                  {/* Main Content: post feed */}
                  <div className="flex-grow min-h-screen lg:flex-1 border-x border-b transition-all duration-300">
                    <div className="w-full">{children}</div>
                  </div>

                  {/* Right Sidebar */}
                  <div className="hidden lg:flex lg:flex-col lg:w-96 xl:w-96 p-4 sticky top-0 h-screen overflow-y-auto">
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
          </SidebarInset>
        </div>
      </ResponsiveLayoutWrapper>
      {/* <Footer /> */}
    </div>
  );
}
