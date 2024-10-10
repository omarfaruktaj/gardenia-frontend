'use client';

import { useState, useTransition } from 'react';

import { MoreHorizontal, Trash } from 'lucide-react';
import { toast } from 'sonner';

import AlertModal from '@/components/ui/alert-model';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { changeUserRole } from '@/services/user-service';
import { TUser } from '@/types';

export function CellAction({ data }: { data: TUser }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      // const result = await deleteCategory(data._id); // Assuming deleteCategory is the correct function
      // if (result.error) {
      //   toast.error(result.error);
      // }
      // if (result.data) {
      //   toast.success('User deleted successfully');
      // }
    });
  };

  const handleRoleChange = async (newRole: string) => {
    startTransition(async () => {
      const result = await changeUserRole(data?._id, newRole);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`User role changed to ${newRole}`);
      }
    });
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          {/* Uncomment if needed
          <DropdownMenuItem
            onClick={() => router.push(`/admin/categories/${data._id}`)}
          >
            <Edit className="mr-2 h-4 w-4" />
            Update
          </DropdownMenuItem>
          */}

          <DropdownMenuItem
            disabled={data.role === 'admin'}
            className="cursor-pointer"
            onClick={() => handleRoleChange('admin')}
          >
            <span className="ml-2">Make Admin</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="!text-red-500"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>

          {/* <DropdownMenuItem
            disabled={data.role === 'user'}
            className="cursor-pointer"
            onClick={() => handleRoleChange('user')}
          >
            <span className="ml-2">User</span>
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
