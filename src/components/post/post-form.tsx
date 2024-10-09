'use client';

import { useCallback, useRef, useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import ReactQuill from 'react-quill';
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
import { uploadImageToCloudinary } from '@/utils/upload-image-to-cloudinary';

import { Checkbox } from '../ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import UploadMultiImage from '../upload-multi-image';

interface PostFormProps {
  initialData?: TPost;
  closeModel: () => void;
}

export default function PostForm({ initialData, closeModel }: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const [uploadingImage, setUploadingImage] = useState(false);
  const { user } = useUser();

  const quillRef = useRef<ReactQuill>(null);

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

  const handleImageUpload = useCallback(() => {
    if (typeof window !== 'undefined') {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();
      input.onchange = async () => {
        const file = input.files ? input.files[0] : null;
        if (file) {
          setUploadingImage(true);
          const imageUrl = await uploadImageToCloudinary(file);
          setUploadingImage(false);
          if (imageUrl && quillRef.current) {
            const quill = quillRef.current!.getEditor();
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, 'image', imageUrl, 'user');
          }
        }
      };
    }
  }, []);

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
    'image',
  ];

  const toolbarOptions = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'code-block'],
    ['link', 'image'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['clean'],
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
      handlers: {
        image: handleImageUpload,
      },
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
        closeModel();
        toast.error(error.message);
      } else if (data) {
        closeModel();
        toast.success(data.message);
      }
    });
  };

  const action = initialData ? 'Save changes' : 'Post';
  const loadingAction = initialData ? 'Saving changes...' : 'Posting...';

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  modules={modules}
                  ref={quillRef}
                  formats={formats}
                />
                {/* <QuillEditor
                  {...field}
                  onChange={field.onChange}
                  modules={modules}
                  ref={quillRef}
                  formats={formats}
                /> */}
              </FormControl>
              {uploadingImage && (
                <p className="flex items-center gap-2 text-sm">
                  <span>Image uploading...</span>
                </p>
              )}
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
