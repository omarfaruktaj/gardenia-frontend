'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
import { PasswordInput } from '@/components/ui/password-input';
import { useUser } from '@/context/user-provider';
import { TSignUpSchema, signUpSchema } from '@/schemas/auth-schema';
import { singUp } from '@/services/auth-service';

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();
  const { setUser } = useUser();

  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: 'omar',
      email: 'omar@gmail.com',
      password: '123456',
    },
  });

  function onSubmit(values: TSignUpSchema) {
    setError(undefined);

    startTransition(async () => {
      const { data, error } = await singUp(values);

      if (error) {
        form.reset();
        setError(error);
      }

      if (data) {
        setUser(data.user);
        router.push('/');
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorCard message={error} />

        <LoadingButton loading={isPending} type="submit" className="w-full">
          {isPending ? 'Signing up...' : 'Sign Up'}
        </LoadingButton>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account?
          <Button variant={'link'} asChild className="pl-1">
            <Link href="/login">Log in here</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
