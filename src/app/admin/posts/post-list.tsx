'use client';

import { useState } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';
import { Filter, Grid3X3, List, Loader2, Search, X } from 'lucide-react';
import { FaFileAlt } from 'react-icons/fa';

import InfiniteScrollContainer from '@/components/infinitive-scroll-container';
import PostCard from '@/components/post/post-card';
import PostCardSkeleton from '@/components/skeleton/post-card-skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchPosts } from '@/services/post-service';
import type { ISinglePost } from '@/types';

export default function PostList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['ADMIN_POSTS', searchQuery, statusFilter, sortBy],
    queryFn: ({ pageParam = 1 }) =>
      fetchPosts({
        pageParam,
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage?.pagination?.next ?? null,
  });

  const posts = data?.pages?.flatMap((page) => page.posts) || [];

  if (status === 'pending') {
    return (
      <div className="space-y-6">
        {/* Toolbar Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-10 w-64 bg-muted rounded-md animate-pulse" />
            <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
            <div className="h-10 w-32 bg-muted rounded-md animate-pulse" />
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-10 w-24 bg-muted rounded-md animate-pulse" />
            <div className="h-10 w-20 bg-muted rounded-md animate-pulse" />
          </div>
        </div>

        {/* Posts Grid Skeleton */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </section>
      </div>
    );
  }

  if (status === 'success' && !posts.length && !hasNextPage) {
    return (
      <div className="space-y-6">
        {/* Toolbar */}
        <PostListToolbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortBy={sortBy}
          setSortBy={setSortBy}
          viewMode={viewMode}
          setViewMode={setViewMode}
          totalPosts={0}
        />

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="rounded-full bg-muted p-6 mb-4">
            <FaFileAlt className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">No posts found</h3>
          <p className="text-muted-foreground mb-6 max-w-md">
            {searchQuery || statusFilter !== 'all'
              ? "Try adjusting your search or filter criteria to find what you're looking for."
              : "It looks like there aren't any posts available. Start creating and sharing your thoughts!"}
          </p>
          <Button>Create Your First Post</Button>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="rounded-full bg-red-100 p-6 mb-4">
          <FaFileAlt className="h-12 w-12 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Error loading posts</h3>
        <p className="text-muted-foreground mb-6">
          An error occurred while fetching posts. Please try again.
        </p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <PostListToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
        viewMode={viewMode}
        setViewMode={setViewMode}
        totalPosts={posts.length}
      />

      {/* Posts Grid/List */}
      <InfiniteScrollContainer
        onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
      >
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          }
        >
          {posts.length > 0 &&
            posts.map((post: ISinglePost) => (
              <PostCard key={post?._id} post={post} />
            ))}
        </div>
        {isFetchingNextPage && (
          <div className="flex justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}
      </InfiniteScrollContainer>
    </div>
  );
}

interface PostListToolbarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  statusFilter: string;
  setStatusFilter: (status: string) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  totalPosts: number;
}

function PostListToolbar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  sortBy,
  setSortBy,
  viewMode,
  setViewMode,
  totalPosts,
}: PostListToolbarProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      {/* Left side - Search and Filters */}
      <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center lg:flex-1 lg:space-x-2">
        <div className="relative w-full sm:max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 w-full"
          />
          {searchQuery && (
            <Button
              variant="ghost"
              onClick={() => setSearchQuery('')}
              className="absolute right-0 top-0 h-full px-3 py-0 hover:bg-transparent"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-[140px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="title">Title A-Z</SelectItem>
            <SelectItem value="views">Most Views</SelectItem>
            <SelectItem value="likes">Most Liked</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="outline" size="sm" className="w-full sm:w-auto">
          <Filter className="mr-2 h-4 w-4" />
          More Filters
        </Button>
      </div>

      {/* Right side - View controls and stats */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
        <span className="text-sm text-muted-foreground">
          {totalPosts} {totalPosts === 1 ? 'post' : 'posts'}
        </span>

        <Tabs
          value={viewMode}
          onValueChange={(value) => setViewMode(value as 'grid' | 'list')}
        >
          <TabsList className="grid grid-cols-2 w-full sm:w-auto">
            <TabsTrigger
              value="grid"
              className="flex items-center justify-center space-x-1"
            >
              <Grid3X3 className="h-4 w-4" />
              <span className="hidden sm:inline">Grid</span>
            </TabsTrigger>
            <TabsTrigger
              value="list"
              className="flex items-center justify-center space-x-1"
            >
              <List className="h-4 w-4" />
              <span className="hidden sm:inline">List</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}
