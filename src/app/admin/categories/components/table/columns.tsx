'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TCategory } from '@/types';

export const columns: ColumnDef<TCategory>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
];
