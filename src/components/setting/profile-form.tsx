'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/context/user-provider';
import {
  type TUserUpdateSchema,
  userUpdateSchema,
} from '@/schemas/user-schema';
import { getCurrentUser, updateUser } from '@/services/user-service';

import { ErrorCard } from '../ui/error-card';

// const profileFormSchema = z.object({
//   name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
//   email: z.string().email({ message: 'Please enter a valid email address.' }),
//   bio: z.string().max(160, { message: 'Bio must not exceed 160 characters.' }).optional(),
//   username: z.string().min(2, { message: 'Username must be at least 2 characters.' }),
// });

export default function ProfileForm() {
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
        toast.success('Profile info updated successfully.');

        const updatedUser = await getCurrentUser();
        if (updatedUser) {
          queryClient.invalidateQueries({ queryKey: ['ME'] });
        }
      }
    });
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-6">
        <Avatar className="h-20 w-20">
          <AvatarImage src={user?.avatar} alt="Profile" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <Button variant="outline" size="sm">
            Change Avatar
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            JPG, GIF or PNG. 1MB max.
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
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
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Brief description for your profile. Maximum 160 characters.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? 'Saving...' : 'Save changes'}
          </Button>
        </form>
      </Form>
      {error && <ErrorCard message={error} />}
    </div>
  );
}
