'use client';

import { useState, useTransition } from 'react';

import {
  MoreHorizontal,
  Shield,
  ShieldCheck,
  UserCheck,
  UserX,
} from 'lucide-react';
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
import { changeUserRole } from '@/services/user-service';
import type { TUser } from '@/types';

export function CellAction({ data }: { data: TUser }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const onDelete = () => {
    startTransition(async () => {
      // Implement delete functionality
      toast.success('User deleted successfully');
      setOpen(false);
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

  const handleVerificationToggle = async () => {
    startTransition(async () => {
      // Implement verification toggle
      const action = data.isVerified ? 'unverified' : 'verified';
      toast.success(`User ${action} successfully`);
    });
  };

  // const sendEmail = async () => {
  //   startTransition(async () => {
  //     // Implement send email functionality
  //     toast.success('Email sent successfully');
  //   });
  // };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
        title="Delete User"
        description="Are you sure you want to delete this user? This action cannot be undone."
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>User Actions</DropdownMenuLabel>

          {/* <DropdownMenuItem className="cursor-pointer">
            <Eye className="mr-2 h-4 w-4" />
            View Details
          </DropdownMenuItem> */}

          {/* <DropdownMenuItem className="cursor-pointer">
            <Edit className="mr-2 h-4 w-4" />
            Edit User
          </DropdownMenuItem>

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={sendEmail}
            disabled={isPending}
          >
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </DropdownMenuItem> */}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            className="cursor-pointer"
            onClick={handleVerificationToggle}
            disabled={isPending}
          >
            {data.isVerified ? (
              <>
                <UserX className="mr-2 h-4 w-4" />
                Mark as Unverified
              </>
            ) : (
              <>
                <UserCheck className="mr-2 h-4 w-4" />
                Mark as Verified
              </>
            )}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            disabled={data.role === 'admin' || isPending}
            className="cursor-pointer"
            onClick={() => handleRoleChange('admin')}
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            Make Admin
          </DropdownMenuItem>

          <DropdownMenuItem
            disabled={data.role === 'user' || isPending}
            className="cursor-pointer"
            onClick={() => handleRoleChange('user')}
          >
            <Shield className="mr-2 h-4 w-4" />
            Make User
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* <DropdownMenuItem
            onClick={() => setOpen(true)}
            className="!text-red-500 cursor-pointer focus:!text-red-500"
            disabled={isPending}
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete User
          </DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
