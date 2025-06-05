'use client';

import type { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import type { IPayment } from '@/types';

import { CellAction } from './cell-action';

export const columns: ColumnDef<IPayment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'transactionID',
    header: 'Transaction',
    cell: ({ row }) => {
      const transactionID = row.getValue('transactionID') as string;
      return (
        <div className="flex flex-col">
          <span className="font-mono text-sm font-medium">{transactionID}</span>
          <span className="text-xs text-muted-foreground">{'Card'}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'user',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 lg:px-3"
        >
          Customer
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original.user;
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user?.avatar || '/placeholder.svg'}
              alt={user?.name}
            />
            <AvatarFallback className="text-xs">
              {user?.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase() || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{user?.name || 'Unknown User'}</span>
            <span className="text-sm text-muted-foreground">{user?.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'amount',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 lg:px-3 justify-end"
        >
          Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return (
        <div className="text-right">
          <div className="font-medium">{formatted}</div>
          <div className="text-xs text-muted-foreground">{'USD'}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = (row.getValue('status') as string) || 'pending';

      const getStatusVariant = (status: string) => {
        switch (status.toLowerCase()) {
          case 'completed':
          case 'success':
            return 'default';
          case 'pending':
            return 'secondary';
          case 'failed':
          case 'cancelled':
            return 'destructive';
          default:
            return 'outline';
        }
      };

      return (
        <Badge
          variant={getStatusVariant(status)}
          className="font-medium capitalize"
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-8 px-2 lg:px-3"
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.getValue('createdAt') as string;
      const formattedDate = date ? new Date(date).toLocaleDateString() : 'N/A';
      const formattedTime = date
        ? new Date(date).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '';

      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{formattedDate}</span>
          <span className="text-xs text-muted-foreground">{formattedTime}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => {
      const description = row.getValue('description') as string;
      return (
        <div className="max-w-[200px]">
          <p className="truncate text-sm">{description || 'No description'}</p>
        </div>
      );
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
