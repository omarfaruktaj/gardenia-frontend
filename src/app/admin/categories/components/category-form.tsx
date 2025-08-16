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
import { CategorySchema, type CategoryType } from '@/schemas/category-schema';
import { createCategory } from '@/services/category-service';

interface CategoryFormProps {
  initialData?: CategoryType;
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);

  const action = initialData ? 'Save changes' : 'Create Category';
  const actionLoading = initialData
    ? 'Saving changes...'
    : 'Creating category...';

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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Category Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="e.g., Technology, Marketing, Design"
                  className="h-11 bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20"
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
              <FormLabel className="text-sm font-medium text-foreground">
                Description
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe what this category is for and what content it should contain..."
                  className="min-h-[100px] bg-background/50 border-border/50 focus:border-primary/50 focus:ring-primary/20 resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorCard message={error} />

        <div className="pt-4">
          <LoadingButton
            loading={isPending}
            type="submit"
            className="w-full h-11 font-medium"
          >
            {isPending ? actionLoading : action}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
