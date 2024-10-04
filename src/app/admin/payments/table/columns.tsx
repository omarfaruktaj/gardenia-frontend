'use client';

import { ColumnDef } from '@tanstack/react-table';

import { IPayment } from '@/types';

import { CellAction } from './cell-action';

export const columns: ColumnDef<IPayment>[] = [
  {
    accessorKey: 'transactionID',
    header: 'Transaction ID',
  },
  {
    accessorKey: 'user.name',
    header: 'User',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
