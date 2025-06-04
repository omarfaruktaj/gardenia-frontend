'use client';

import { useState, useTransition } from 'react';

import { Copy, Edit, Eye, MoreHorizontal, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import AlertModal from '@/components/ui/alert-model';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteCategory } from '@/services/category-service';
import type { TCategory } from '@/types';

export function CellAction({ data }: { data: TCategory }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      const result = await deleteCategory(data._id);

      if (result.error) {
        toast.error(result.error);
      }

      if (result.data) {
        toast.success('Category deleted successfully');
        setOpen(false);
      }
    });
  };

  const onCopy = () => {
    navigator.clipboard.writeText(data._id);
    toast.success('Category ID copied to clipboard');
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
        title="Delete Category"
        description="Are you sure you want to delete this category? This action cannot be undone and will affect all associated items."
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>Category Actions</DropdownMenuLabel>

          <DropdownMenuItem className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" asChild>
            <Link href={`/admin/categories/${data._id}/edit`}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Category
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem className="cursor-pointer" onClick={onCopy}>
            <Copy className="mr-2 h-4 w-4" />
            Copy ID
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="!text-red-500 cursor-pointer focus:!text-red-500"
            disabled={isPending}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete Category
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
