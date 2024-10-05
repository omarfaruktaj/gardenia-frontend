'use client';

import { useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';

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
import { useUser } from '@/context/user-provider';
import { CategoryType } from '@/schemas/category-schema';
import { PostFormSchema, TPostFormSchema } from '@/schemas/post-schema';
import { getCategories } from '@/services/category-service';
import { createPost, updatePost } from '@/services/post-service';
import { TPost } from '@/types';

import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import UploadMultiImage from '../upload-multi-image';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface PostFormProps {
  initialData?: TPost;
}

export default function PostForm({ initialData }: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const { user } = useUser();

  const { data: categories, isLoading } = useQuery({
    queryKey: ['CATEGORIES'],
    queryFn: () => getCategories(),
  });

  const form = useForm<TPostFormSchema>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: initialData
      ? initialData
      : {
          title: '',
          category: '',
          content: '',
          premium: false,
          images: [],
        },
  });

  console.log(categories);

  const formats = [
    'header',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'link',
    'color',
    'code-block',
    'font',
    'align',
    'code',
  ];

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ['link', 'image', 'clean'],
    [{ font: [] }],
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  const onSubmit = async (values: TPostFormSchema) => {
    startTransition(async () => {
      let response;

      if (initialData) {
        response = await updatePost(initialData._id, values);
      } else {
        response = await createPost(values);
      }

      const { data, error } = response;

      if (error) {
        toast.error(error.message);
      } else if (data) {
        toast.success(data.message);
      }
    });
  };

  const action = initialData ? 'Save changes' : 'Post';
  const loadingAction = initialData ? 'Saving changes...' : 'Posting...';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  className="text-xl"
                  placeholder="Enter post title"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <ReactQuill
                  {...field}
                  onChange={field.onChange}
                  placeholder="Write your content here..."
                  modules={modules}
                  formats={formats}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger disabled={isLoading}>
                    <SelectValue placeholder="Select a Category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories?.map(
                    (category: CategoryType & { _id: string }) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="images"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <UploadMultiImage
                  value={field.value}
                  disabled={isPending}
                  onChange={(urls) => field.onChange([...field.value, ...urls])}
                  onRemove={(url) =>
                    field.onChange(
                      field.value.filter((current) => current !== url)
                    )
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {user?.isVerified && (
          <FormField
            control={form.control}
            name="premium"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Premium Post</FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <LoadingButton loading={isPending} type="submit" className="w-full">
          {isPending ? loadingAction : action}
        </LoadingButton>
      </form>
    </Form>
  );
}
