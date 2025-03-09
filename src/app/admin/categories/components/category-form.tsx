'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

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
import { Textarea } from '@/components/ui/textarea';
import { CategorySchema, CategoryType } from '@/schemas/category-schema';
import { createCategory } from '@/services/category-service';

interface CategoryFormProps {
  initialData?: CategoryType;
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);

  const action = initialData ? 'Save changes' : 'Create';
  const actionLoading = initialData ? 'Saving changes..' : 'Creating...';

  const router = useRouter();

  const form = useForm<CategoryType>({
    resolver: zodResolver(CategorySchema),
    defaultValues: initialData
      ? {
          ...initialData,
        }
      : {
          name: '',
          description: '',
        },
  });

  function onSubmit(values: CategoryType) {
    setError(undefined);

    startTransition(async () => {
      const { data, error } = await createCategory(values);

      if (error) {
        setError(error);
      }

      if (data) {
        router.back();
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
                <Input
                  type="text"
                  placeholder="Enter category name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter category description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorCard message={error} />

        <LoadingButton loading={isPending} type="submit" className="w-full">
          {isPending ? actionLoading : action}
        </LoadingButton>
      </form>
    </Form>
  );
}
