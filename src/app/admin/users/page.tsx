import { Suspense } from 'react';

import { Shield, UserCheck, UserX, Users } from 'lucide-react';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/config/axios';
import { UserResponse } from '@/types';

import { columns } from './components/table/columns';
import { DataTable } from './components/table/data-table';

async function getUserStats() {
  try {
    const response = await api.get('/users');
    const users = response.data.data;

    return {
      total: users.length,
      verified: users.filter((user: UserResponse) => user.isVerified).length,
      unverified: users.filter((user: UserResponse) => !user.isVerified).length,
      admins: users.filter((user: UserResponse) => user.role === 'admin')
        .length,
    };
  } catch {
    return { total: 0, verified: 0, unverified: 0, admins: 0 };
  }
}

async function getUsers() {
  const response = await api.get('/users');
  return response.data.data;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function StatsCards({ stats }: { stats: any }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.total}</div>
          <p className="text-xs text-muted-foreground">All registered users</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Verified Users</CardTitle>
          <UserCheck className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {stats.verified}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.total > 0
              ? Math.round((stats.verified / stats.total) * 100)
              : 0}
            % of total users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Unverified Users
          </CardTitle>
          <UserX className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {stats.unverified}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.total > 0
              ? Math.round((stats.unverified / stats.total) * 100)
              : 0}
            % of total users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Administrators</CardTitle>
          <Shield className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">{stats.admins}</div>
          <p className="text-xs text-muted-foreground">System administrators</p>
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

export default async function UsersPage() {
  const [stats, users] = await Promise.all([getUserStats(), getUsers()]);

  return (
    <div className="flex-1 space-y-6 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage and monitor all user accounts in your system
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards stats={stats} />
      </Suspense>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <p className="text-sm text-muted-foreground">
            A comprehensive list of all users with their details and actions
          </p>
        </CardHeader>
        <CardContent className="max-w-md">
          <DataTable columns={columns} data={users} />
        </CardContent>
      </Card>
    </div>
  );
}
