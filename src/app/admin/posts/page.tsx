import { Suspense } from 'react';

import { Eye, FileText, Heart, TrendingUp } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

import PostList from './post-list';

// Mock function to get post stats - replace with actual API call
async function getPostStats() {
  try {
    // Replace with actual API call
    // const response = await api.get("/posts/stats")

    // Mock data for demonstration
    return {
      totalPosts: 156,
      publishedPosts: 142,
      draftPosts: 14,
      totalViews: 12450,
      totalLikes: 3240,
      totalComments: 890,
      thisWeekPosts: 8,
      averageViews: 79.8,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return {
      totalPosts: 0,
      publishedPosts: 0,
      draftPosts: 0,
      totalViews: 0,
      totalLikes: 0,
      totalComments: 0,
      thisWeekPosts: 0,
      averageViews: 0,
    };
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatsCards({ stats }: { stats: any }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPosts}</div>
          <p className="text-xs text-muted-foreground">
            {stats.publishedPosts} published, {stats.draftPosts} drafts
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Views</CardTitle>
          <Eye className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {stats.totalViews.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Avg. {stats.averageViews} views per post
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Engagement</CardTitle>
          <Heart className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">
            {stats.totalLikes.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.totalComments} comments
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Week</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {stats.thisWeekPosts}
          </div>
          <p className="text-xs text-muted-foreground">New posts published</p>
        </CardContent>
      </Card>
    </div>
  );
}

function StatsCardsSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-16 mb-2" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function PostsPage() {
  const stats = await getPostStats();

  return (
    <div className="flex-1 space-y-6 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
          <p className="text-muted-foreground">
            Create, manage, and monitor all your content
          </p>
        </div>
        {/* <Button asChild className="flex items-center space-x-2">
          <Link href="/admin/posts/create">
            <Plus className="h-4 w-4" />
            <span>New Post</span>
          </Link>
        </Button> */}
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards stats={stats} />
      </Suspense>

      {/* Posts Content */}
      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your content library with advanced filtering and search
            capabilities
          </p>
        </CardHeader>
        <CardContent>
          <PostList />
        </CardContent>
      </Card>
    </div>
  );
}
