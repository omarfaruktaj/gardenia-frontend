'use client';

import { ColumnDef } from '@tanstack/react-table';

import { TUser } from '@/types';

import { CellAction } from './cell-action';

export const columns: ColumnDef<TUser>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'username',
    header: 'Username',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'isVerified',
    header: 'Verified',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
