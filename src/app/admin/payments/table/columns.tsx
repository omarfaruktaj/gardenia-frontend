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
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue('amount'));
      const formatted = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },

  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
