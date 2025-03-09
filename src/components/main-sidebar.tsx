import MainSidebarNav from './main-sidebar-nav';
import PostButton from './post/create-post-button';

export default function MainSidebar() {
  return (
    <div className="flex flex-col h-screen">
      <MainSidebarNav />
      <div className="px-4 mt-auto mb-28">
        <PostButton />
      </div>
    </div>
  );
}
