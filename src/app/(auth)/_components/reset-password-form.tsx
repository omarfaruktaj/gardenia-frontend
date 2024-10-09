'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
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
  TResetPasswordSchema,
  resetPasswordSchema,
} from '@/schemas/auth-schema';
import { resetPassword } from '@/services/auth-service';

export default function ResetPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const queryClient = useQueryClient();

  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  if (!token) {
    router.push('/login');
  }

  async function onSubmit(values: TResetPasswordSchema) {
    setError(undefined);

    startTransition(async () => {
      const { data, error } = await resetPassword(values.password, token!);

      if (error) {
        form.reset();
        setError(error);
      }

      if (data) {
        queryClient.invalidateQueries({ queryKey: ['ME'] });
        form.reset();
        router.push('/');
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorCard message={error} />

        <LoadingButton loading={isPending} type="submit" className="w-full">
          {isPending ? 'Resetting password...' : 'Reset Password'}
        </LoadingButton>

        <div className="mt-4 text-center text-sm text-muted-foreground">
          Remembered your password?
          <Button variant={'link'} asChild className="pl-1">
            <Link href="/login"> Log in</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
