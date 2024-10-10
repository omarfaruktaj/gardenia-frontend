'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
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
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/ui/loading-button';
import { SuccessCard } from '@/components/ui/success-card';
import {
  TForgotPasswordSchema,
  forgotPasswordSchema,
} from '@/schemas/auth-schema';
import { forgotPassword } from '@/services/auth-service';

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>('');

  const form = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: 'omar@gmail.com',
    },
  });

  function onSubmit(values: TForgotPasswordSchema) {
    setError(undefined);
    setSuccess(undefined);

    startTransition(async () => {
      const { success, error } = await forgotPassword(values);

      if (error) {
        form.reset();
        setError(error);
      }

      if (success) {
        form.reset();
        setSuccess(success);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorCard message={error} />
        <SuccessCard message={success} />

        <LoadingButton loading={isPending} type="submit" className="w-full">
          {isPending ? 'Reset link sending...' : 'Send link in email'}
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
