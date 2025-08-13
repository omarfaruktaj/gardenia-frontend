import { Suspense } from 'react';

import { Archive, FolderOpen, Plus, Tag, TrendingUp } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/config/axios';
import { TCategoryResponse } from '@/types';

import { columns } from './components/table/columns';

async function getCategoryStats() {
  try {
    const response = await api.get('/categories');
    const categories = response.data.data.categories;

    return {
      total: categories.length,
      active: categories.filter((cat: TCategoryResponse) => cat).length,
      inactive: categories.filter((cat: TCategoryResponse) => !cat).length,
      recent: categories.filter((cat: TCategoryResponse) => {
        const createdAt = new Date(cat.createdAt);
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return createdAt > weekAgo;
      }).length,
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { total: 0, active: 0, inactive: 0, recent: 0 };
  }
}

async function getCategories() {
  const response = await api.get('/categories');
  return response.data.data.categories;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatsCards({ stats }: { stats: any }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Total Categories
          </CardTitle>
          <FolderOpen className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">
            All categories in system
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Active Categories
          </CardTitle>
          <Tag className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {stats.active}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.total > 0
              ? Math.round((stats.active / stats.total) * 100)
              : 0}
            % of total categories
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Inactive Categories
          </CardTitle>
          <Archive className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {stats.inactive}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.total > 0
              ? Math.round((stats.inactive / stats.total) * 100)
              : 0}
            % of total categories
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Recent Categories
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.recent}</div>
          <p className="text-xs text-muted-foreground">Added in last 7 days</p>
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

export default async function CategoriesPage() {
  const [stats, categories] = await Promise.all([
    getCategoryStats(),
    getCategories(),
  ]);

  return (
    <div className="flex-1 space-y-6 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Categories</h1>
          <p className="text-muted-foreground">
            Organize and manage your content categories
          </p>
        </div>
        <Button asChild className="flex items-center space-x-2">
          <Link href="/admin/categories/create">
            <Plus className="h-4 w-4" />
            <span>New Category</span>
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards stats={stats} />
      </Suspense>

      {/* Categories Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage your content categories, their descriptions, and organization
          </p>
        </CardHeader>
        <CardContent className="max-w-md">
          <DataTable columns={columns} data={categories} />
        </CardContent>
      </Card>
    </div>
  );
}
