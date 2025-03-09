'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TCategory } from '@/types';

import { CellAction } from './cell-action';

export const columns: ColumnDef<TCategory>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
