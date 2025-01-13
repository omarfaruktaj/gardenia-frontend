'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ErrorCard } from '@/components/ui/error-card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import LoadingButton from '@/components/ui/loading-button';
import { PasswordInput } from '@/components/ui/password-input';
import {
  TChangePasswordSchema,
  changePasswordSchema,
} from '@/schemas/auth-schema';
import { changePassword, logout } from '@/services/auth-service';
import { getCurrentUser } from '@/services/user-service';

export default function ChangePasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const form = useForm<TChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
  });

  function onSubmit(values: TChangePasswordSchema) {
    setError(undefined);

    startTransition(async () => {
      const { data, error } = await changePassword(values);

      if (error) {
        form.reset();
        setError(error.message);
      }

      if (data) {
        toast.success('Password successfully changed. Please login again');
        await logout();
        await getCurrentUser();
        router.push('/login');
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your current password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput
                  placeholder="Enter your new password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorCard message={error} />

        <LoadingButton loading={isPending} type="submit" className="w-full">
          {isPending ? 'Changing Password...' : 'Change Password'}
        </LoadingButton>
      </form>
    </Form>
  );
}
