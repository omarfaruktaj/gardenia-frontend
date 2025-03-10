
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorCard } from '@/components/ui/error-card';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import LoadingButton from '@/components/ui/loading-button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useUser } from '@/context/user-provider';
import { type TUserUpdateSchema, userUpdateSchema } from '@/schemas/user-schema';
import { getCurrentUser, updateUser } from '@/services/user-service';

import CoverInput from './cover-input';
import ProfileImageInput from './profile-image-input';

interface UpdateProfileFormProps {
  closeModel: () => void
}

export default function UpdateProfileForm({ closeModel }: UpdateProfileFormProps) {
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
        toast.success('Profile info updated successfully.');

        const updatedUser = await getCurrentUser();
        if (updatedUser) {
          queryClient.invalidateQueries({ queryKey: ['ME'] });
        }
      }
    });
  }

  return (
    <Card className="w-full shadow-none border-0 ">
      <CardHeader className="relative pb-2">
        
        <CardTitle className="text-2xl font-bold">Edit Profile</CardTitle>
        <CardDescription>Update your profile information and customize how others see you</CardDescription>
      </CardHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="cover"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cover Image</FormLabel>
                    <FormDescription>This will be displayed at the top of your profile</FormDescription>
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
                    <FormDescription>This will be displayed on your profile and in comments</FormDescription>
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
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground">Personal Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Enter your name" {...field} className="w-full" />
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
                        <Input type="text" placeholder="Enter your username" {...field} className="w-full" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormDescription>Tell others about yourself in a few words</FormDescription>
                    <FormControl>
                      <Textarea placeholder="Tell us about yourself" {...field} className="min-h-[120px] resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {error && <ErrorCard message={error}  />}
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-6 px-6">
            <Button type="button" variant="outline" onClick={closeModel} disabled={isPending}>
              Cancel
            </Button>
            <LoadingButton loading={isPending} type="submit">
              {isPending ? 'Updating...' : 'Save Changes'}
            </LoadingButton>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}

