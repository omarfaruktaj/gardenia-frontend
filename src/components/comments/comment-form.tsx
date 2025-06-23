'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import LoadingButton from '@/components/ui/loading-button';
import {
  TCommentFormSchema,
  commentFormSchema,
} from '@/schemas/comment-schema';
import { updateComment } from '@/services/comment-service';
import { createComment } from '@/services/post-service';
import { CommentResponse } from '@/types';

import { Textarea } from '../ui/textarea';

interface CommentFormProps {
  postId: string;
  initialData?: CommentResponse;
  onClose?: () => void;
}

export default function CommentForm({
  postId,
  initialData,
  onClose,
}: CommentFormProps) {
  const [isPending, startTransition] = useTransition();

  const form = useForm<TCommentFormSchema>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: initialData || { content: '' },
  });

  const onSubmit = async (values: TCommentFormSchema) => {
    startTransition(async () => {
      const response = initialData
        ? await updateComment(initialData._id, values.content)
        : await createComment(postId, values.content);

      const { data, error } = response;

      if (error) {
        toast.error(error.message);
      } else if (data) {
        if (onClose) {
          onClose();
        }
        form.reset();
        toast.success(data.message);
      }
    });
  };

  const actionLabel = initialData ? 'Save Changes' : 'Post Comment';
  const loadingLabel = initialData ? 'Saving...' : 'Posting...';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <LoadingButton loading={isPending} type="submit">
            {isPending ? loadingLabel : actionLabel}
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
