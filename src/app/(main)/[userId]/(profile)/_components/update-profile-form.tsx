'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
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
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/ui/loading-button';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/context/user-provider';
import { TUserUpdateSchema, userUpdateSchema } from '@/schemas/user-schema';
import { getCurrentUser, updateUser } from '@/services/user-service';

import CoverInput from './cover-input';
import ProfileImageInput from './profile-image-input';

interface UpdateProfileFormProps {
  closeModel: () => void;
}

export default function UpdateProfileForm({
  closeModel,
}: UpdateProfileFormProps) {
  const { user } = useUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const form = useForm<TUserUpdateSchema>({
    resolver: zodResolver(userUpdateSchema),
    defaultValues: user!,
  });
  const queryClient = useQueryClient();

  async function onSubmit(values: TUserUpdateSchema) {
    setError(undefined);
    startTransition(async () => {
      const { data, error } = await updateUser(values);

      if (error) {
        setError(error);
      }

      if (data) {
        closeModel();
        toast.success('Profile info update successfully.');

        const updatedUser = await getCurrentUser();
        if (updatedUser) {
          queryClient.invalidateQueries({ queryKey: ['ME'] });
        }
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="cover"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cover Image</FormLabel>
              <FormControl>
                <CoverInput
                  value={field.value as string}
                  disabled={isPending}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange(null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="avatar"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <ProfileImageInput
                  value={field.value as string}
                  disabled={isPending}
                  onChange={(url) => field.onChange(url)}
                  onRemove={() => field.onChange(null)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ErrorCard message={error} />

        <LoadingButton loading={isPending} type="submit" className="w-full">
          {isPending ? 'Updating...' : 'Update Profile'}
        </LoadingButton>
      </form>
    </Form>
  );
}
