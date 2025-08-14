'use client';

import { useCallback, useEffect, useRef, useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Crown,
  Eye,
  FileText,
  ImageIcon,
  Save,
  Send,
  Tag,
  Type,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'sonner';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/context/user-provider';
import type { CategoryType } from '@/schemas/category-schema';
import { PostFormSchema, type TPostFormSchema } from '@/schemas/post-schema';
import { getCategories } from '@/services/category-service';
import { createPost, updatePost } from '@/services/post-service';
import type { TPost } from '@/types';

import { AutosizeTextarea } from '../ui/auto-resize-text-area';
import { ImageUpload } from './post-image-upload';
import { PostPreview } from './post-preview';

// const ReactQuill = dynamic(() => import('react-quill'), {
//   ssr: false,
//   loading: () => (
//     <div className="h-64 bg-muted animate-pulse rounded-md flex items-center justify-center">
//       <p className="text-muted-foreground">Loading editor...</p>
//     </div>
//   ),
// });

interface PostFormProps {
  initialData?: TPost;
  closeModel: () => void;
}

const TITLE_MAX_LENGTH = 100;
const CONTENT_MAX_LENGTH = 10000;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let QuillEditor: any = null;

export default function PostForm({ initialData, closeModel }: PostFormProps) {
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState('write');
  const [titleCharCount, setTitleCharCount] = useState(0);
  const [contentCharCount, setContentCharCount] = useState(0);
  const { user } = useUser();
  const queryClient = useQueryClient();
  const isMounted = useRef(false);

  const [isEditorReady, setIsEditorReady] = useState(false);

  useEffect(() => {
    (async () => {
      const RQ = await import('react-quill');
      QuillEditor = RQ.default;
      setIsEditorReady(true);
    })();
  }, []);

  const { data: categories, isLoading: categoriesLoading } = useQuery({
    queryKey: ['CATEGORIES'],
    queryFn: () => getCategories(),
  });

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const form = useForm<TPostFormSchema>({
    resolver: zodResolver(PostFormSchema),
    defaultValues: initialData || {
      title: '',
      category: '',
      content: '',
      premium: false,
      images: [],
    },
  });

  const watchedValues = form.watch();

  // Update character counts
  useEffect(() => {
    setTitleCharCount(watchedValues.title?.length || 0);
    // Strip HTML tags for content character count
    const textContent = watchedValues.content?.replace(/<[^>]*>/g, '') || '';
    setContentCharCount(textContent.length);
  }, [watchedValues.title, watchedValues.content]);

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'blockquote', 'code-block'],
      [{ color: [] }, { background: [] }],
      ['clean'],
    ],
  };

  const quillFormats = [
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
    'background',
    'code-block',
  ];

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
        queryClient.invalidateQueries({ queryKey: ['FEED_POSTS'] });
        queryClient.invalidateQueries({ queryKey: ['ADMIN_POSTS'] });
        queryClient.invalidateQueries({ queryKey: ['PROFILE_POST'] });
        queryClient.invalidateQueries({ queryKey: ['MY_POSTS'] });
        closeModel();
        toast.success(data.message);
      }
    });
  };

  const saveDraft = useCallback(() => {
    const draftData = form.getValues();
    localStorage.setItem('post-draft', JSON.stringify(draftData));
    toast.success('Draft saved locally');
  }, [form]);

  const loadDraft = useCallback(() => {
    const savedDraft = localStorage.getItem('post-draft');
    if (savedDraft) {
      const draftData = JSON.parse(savedDraft);
      form.reset(draftData);
      toast.success('Draft loaded');
    }
  }, [form]);

  const clearDraft = useCallback(() => {
    localStorage.removeItem('post-draft');
    toast.success('Draft cleared');
  }, []);

  const isFormValid = form.formState.isValid;
  // const hasErrors = Object.keys(form.formState.errors).length > 0;

  if (!isMounted.current) return null;

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {initialData ? 'Edit Post' : 'Create New Post'}
          </h1>
          <p className="text-muted-foreground">
            {initialData
              ? 'Update your existing post'
              : 'Share your thoughts with the world'}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={saveDraft} disabled={isPending}>
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
          <Button variant="outline" onClick={loadDraft} disabled={isPending}>
            Load Draft
          </Button>
          <Button variant="ghost" onClick={clearDraft} disabled={isPending}>
            Clear Draft
          </Button>
        </div>
      </div>

      {/* Form Status Indicator */}
      {/* <Card
        className={`border-l-4 ${isFormValid ? 'border-l-green-500' : hasErrors ? 'border-l-red-500' : 'border-l-yellow-500'}`}
      >
        <CardContent className="pt-4">
          <div className="flex items-center space-x-2">
            {isFormValid ? (
              <Check className="h-5 w-5 text-green-500" />
            ) : hasErrors ? (
              <AlertCircle className="h-5 w-5 text-red-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-yellow-500" />
            )}
            <span className="text-sm font-medium">
              {isFormValid
                ? 'Form is ready to submit'
                : hasErrors
                  ? 'Please fix the errors below'
                  : 'Fill in the required fields'}
            </span>
          </div>
        </CardContent>
      </Card> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="write"
                className="flex items-center space-x-2"
              >
                <Type className="h-4 w-4" />
                <span>Write</span>
              </TabsTrigger>
              <TabsTrigger
                value="preview"
                className="flex items-center space-x-2"
              >
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="write" className="mt-6">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Title Field */}
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <FileText className="h-4 w-4" />
                          <p>Post Title</p>

                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <AutosizeTextarea
                              {...field}
                              minHeight={32}
                              placeholder="Enter an engaging title for your post..."
                              className="text-lg font-medium"
                              maxLength={TITLE_MAX_LENGTH}
                            />
                            <div className="flex justify-between items-center text-sm">
                              <FormDescription>
                                A compelling title helps readers discover your
                                content
                              </FormDescription>
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`${
                                    titleCharCount > TITLE_MAX_LENGTH * 0.9
                                      ? 'text-red-500'
                                      : titleCharCount > TITLE_MAX_LENGTH * 0.7
                                        ? 'text-yellow-500'
                                        : 'text-muted-foreground'
                                  }`}
                                >
                                  {titleCharCount}/{TITLE_MAX_LENGTH}
                                </span>
                                <Progress
                                  value={
                                    (titleCharCount / TITLE_MAX_LENGTH) * 100
                                  }
                                  className="w-16 h-2"
                                />
                              </div>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Content Field */}
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Type className="h-4 w-4" />
                          <span>Content</span>
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2">
                            <div className=" h-[300px] overflow-hidden">
                              {/* <ReactQuill
                                {...field}
                                theme="snow"
                                modules={quillModules}
                                formats={quillFormats}
                                placeholder="Start writing your post content..."
                                className="h-full "
                              /> */}
                              {isEditorReady ? (
                                <QuillEditor
                                  {...field}
                                  theme="snow"
                                  modules={quillModules}
                                  formats={quillFormats}
                                  className="h-full"
                                  placeholder="Start writing your post content..."
                                />
                              ) : (
                                <div className="h-64 bg-muted animate-pulse rounded-md flex items-center justify-center">
                                  <p className="text-muted-foreground">
                                    Loading editor...
                                  </p>
                                </div>
                              )}
                            </div>
                            <div className="flex justify-between items-center text-sm">
                              <FormDescription>
                                Use the toolbar above to format your content
                              </FormDescription>
                              <div className="flex items-center space-x-2">
                                <span
                                  className={`${
                                    contentCharCount > CONTENT_MAX_LENGTH * 0.9
                                      ? 'text-red-500'
                                      : contentCharCount >
                                          CONTENT_MAX_LENGTH * 0.7
                                        ? 'text-yellow-500'
                                        : 'text-muted-foreground'
                                  }`}
                                >
                                  {contentCharCount.toLocaleString()}/
                                  {CONTENT_MAX_LENGTH.toLocaleString()}
                                </span>
                                <Progress
                                  value={
                                    (contentCharCount / CONTENT_MAX_LENGTH) *
                                    100
                                  }
                                  className="w-16 h-2"
                                />
                              </div>
                            </div>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Category Field */}
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <Tag className="h-4 w-4" />
                          <span>Category</span>
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger disabled={categoriesLoading}>
                              <SelectValue placeholder="Choose a category for your post" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories?.map(
                              (category: CategoryType & { _id: string }) => (
                                <SelectItem
                                  key={category._id}
                                  value={category._id}
                                >
                                  <div className="flex items-center space-x-2">
                                    <div className="w-3 h-3 rounded-full bg-primary/20" />
                                    <span>{category.name}</span>
                                  </div>
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Select the most relevant category to help readers find
                          your content
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Images Field */}
                  <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center space-x-2">
                          <ImageIcon className="h-4 w-4" />
                          <span>Images</span>
                        </FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            disabled={isPending}
                            onChange={(urls) =>
                              field.onChange([...field.value, ...urls])
                            }
                            onRemove={(url) =>
                              field.onChange(
                                field.value.filter((current) => current !== url)
                              )
                            }
                          />
                        </FormControl>
                        <FormDescription>
                          Add images to make your post more engaging. Supported
                          formats: JPG, PNG, WebP
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Premium Post Option */}
                  {user?.isVerified && (
                    <FormField
                      control={form.control}
                      name="premium"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center space-x-3 p-4 border rounded-lg bg-gradient-to-r from-yellow-50 to-orange-50">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="flex-1">
                              <FormLabel className="flex items-center space-x-2 cursor-pointer">
                                <Crown className="h-4 w-4 text-yellow-600" />
                                <span>Premium Post</span>
                              </FormLabel>
                              <FormDescription>
                                Mark this post as premium content for
                                subscribers only
                              </FormDescription>
                            </div>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}

                  {/* Submit Buttons */}
                  <div className="flex items-center justify-between pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={closeModel}
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                    <div className="flex items-center space-x-2">
                      <Button
                        type="submit"
                        disabled={isPending || !isFormValid}
                        className="flex items-center space-x-2"
                      >
                        {isPending ? (
                          <>
                            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            <span>
                              {initialData ? 'Updating...' : 'Publishing...'}
                            </span>
                          </>
                        ) : (
                          <>
                            <Send className="h-4 w-4" />
                            <span>
                              {initialData ? 'Update Post' : 'Publish Post'}
                            </span>
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </TabsContent>

            <TabsContent value="preview" className="mt-6">
              <PostPreview
                title={watchedValues.title}
                content={watchedValues.content}
                images={watchedValues.images}
                category={
                  categories?.find(
                    (cat: { _id: string }) => cat._id === watchedValues.category
                  )?.name
                }
                isPremium={watchedValues.premium}
                author={user}
              />
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Post Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Title length
                </span>
                <Badge variant={titleCharCount > 0 ? 'default' : 'secondary'}>
                  {titleCharCount}/{TITLE_MAX_LENGTH}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">
                  Content length
                </span>
                <Badge variant={contentCharCount > 0 ? 'default' : 'secondary'}>
                  {contentCharCount.toLocaleString()}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Images</span>
                <Badge
                  variant={
                    watchedValues.images?.length > 0 ? 'default' : 'secondary'
                  }
                >
                  {watchedValues.images?.length || 0}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Category</span>
                <Badge
                  variant={watchedValues.category ? 'default' : 'secondary'}
                >
                  {watchedValues.category ? 'Selected' : 'None'}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Writing Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Writing Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p>Keep your title under 60 characters for better SEO</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p>Use headings to structure your content</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p>Add images to make your post more engaging</p>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                <p>Choose the most relevant category</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
