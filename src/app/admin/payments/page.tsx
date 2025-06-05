import { Suspense } from 'react';

import {
  AlertCircle,
  CreditCard,
  DollarSign,
  Download,
  Filter,
  TrendingUp,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/ui/data-table';
import { Skeleton } from '@/components/ui/skeleton';
import api from '@/config/axios';

import { columns } from './table/columns';

async function getPaymentStats() {
  try {
    const response = await api.get('/payments');
    const payments = response.data.data.payments;

    const totalRevenue = payments.reduce(
      (sum: number, payment: any) => sum + parseFloat(payment.amount),
      0
    );
    const successfulPayments = payments.filter(
      (payment: any) => payment.status === 'completed'
    ).length;
    const pendingPayments = payments.filter(
      (payment: any) => payment.status === 'pending'
    ).length;
    const failedPayments = payments.filter(
      (payment: any) => payment.status === 'failed'
    ).length;

    // Calculate this month's revenue
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonthRevenue = payments
      .filter((payment: any) => {
        const paymentDate = new Date(payment.createdAt);
        return (
          paymentDate.getMonth() === currentMonth &&
          paymentDate.getFullYear() === currentYear
        );
      })
      .reduce(
        (sum: number, payment: any) => sum + parseFloat(payment.amount),
        0
      );

    return {
      totalRevenue,
      totalPayments: payments.length,
      successfulPayments,
      pendingPayments,
      failedPayments,
      thisMonthRevenue,
      averageTransaction:
        payments.length > 0 ? totalRevenue / payments.length : 0,
    };
  } catch (error) {
    return {
      totalRevenue: 0,
      totalPayments: 0,
      successfulPayments: 0,
      pendingPayments: 0,
      failedPayments: 0,
      thisMonthRevenue: 0,
      averageTransaction: 0,
    };
  }
}

async function getPayments() {
  const response = await api.get('/payments');
  return response.data.data.payments;
}

function StatsCards({ stats }: { stats: any }) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {formatCurrency(stats.totalRevenue)}
          </div>
          <p className="text-xs text-muted-foreground">
            From {stats.totalPayments} transactions
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">This Month</CardTitle>
          <TrendingUp className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {formatCurrency(stats.thisMonthRevenue)}
          </div>
          <p className="text-xs text-muted-foreground">Current month revenue</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Successful Payments
          </CardTitle>
          <CreditCard className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {stats.successfulPayments}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.totalPayments > 0
              ? Math.round(
                  (stats.successfulPayments / stats.totalPayments) * 100
                )
              : 0}
            % success rate
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pending/Failed</CardTitle>
          <AlertCircle className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {stats.pendingPayments + stats.failedPayments}
          </div>
          <p className="text-xs text-muted-foreground">
            {stats.pendingPayments} pending, {stats.failedPayments} failed
          </p>
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
            <Skeleton className="h-8 w-20 mb-2" />
            <Skeleton className="h-3 w-32" />
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default async function PaymentsPage() {
  const [stats, payments] = await Promise.all([
    getPaymentStats(),
    getPayments(),
  ]);

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
          <p className="text-muted-foreground">
            Monitor and manage all payment transactions
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <Suspense fallback={<StatsCardsSkeleton />}>
        <StatsCards stats={stats} />
      </Suspense>

      {/* Payments Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <p className="text-sm text-muted-foreground">
            Complete history of all payment transactions with detailed
            information
          </p>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={payments} />
        </CardContent>
      </Card>
    </div>
  );
}
