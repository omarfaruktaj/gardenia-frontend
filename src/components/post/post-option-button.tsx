'use client';

import { useState } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { Edit, EllipsisVertical, Trash } from 'lucide-react';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { deletePost } from '@/services/post-service';
import { ISinglePost, UserResponse } from '@/types';

import AlertModal from '../ui/alert-model';
import { buttonVariants } from '../ui/button';
import Model from '../ui/model';
import PostForm from './post-form';

export default function PostOptionButton({
  post,
  currentUser,
}: {
  post: ISinglePost;
  currentUser: UserResponse;
}) {
  const [openModel, setOpenModel] = useState(false);

  const [openAlertModel, setOpenAlertModel] = useState(false);

  const queryClient = useQueryClient();

  const handleDelete = async () => {
    const { data, error } = await deletePost(post._id);

    if (data) {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ['FEED_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['ADMIN_POSTS'],
      });
      queryClient.invalidateQueries({
        queryKey: ['PROFILE_POST'],
      });
      queryClient.invalidateQueries({
        queryKey: ['MY_POSTS'],
      });
    }
    if (error) {
      toast.error(error.message);
    }
  };

  const closeModel = () => {
    setOpenModel(false);
  };

  const initialData = {
    title: post.title,
    category: post.category._id,
    content: post.content,
    premium: post.premium,
    images: post.images,
    author: post.author._id,
    _id: post._id,
  };

  return (
    <div>
      <Model isOpen={openModel} onClose={() => setOpenModel(false)}>
        <div className="px-2">
          <PostForm initialData={initialData} closeModel={closeModel} />
        </div>
      </Model>
      <AlertModal
        isOpen={openAlertModel}
        onClose={() => setOpenAlertModel(false)}
        onConfirm={handleDelete}
      />

      <DropdownMenu>
        <DropdownMenuTrigger
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'icon' }),
            'rounded-full'
          )}
          aria-label="Options"
        >
          <EllipsisVertical className="h-6 w-6" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {post?.author?._id === currentUser?._id && (
            <DropdownMenuItem
              onClick={() => setOpenModel(true)}
              aria-label="Edit Comment"
            >
              <Edit className="mr-2" /> Edit
            </DropdownMenuItem>
          )}

          {(post?.author?._id === currentUser?._id ||
            currentUser.role === 'admin') && (
            <DropdownMenuItem
              onClick={() => setOpenAlertModel(true)}
              aria-label="Delete Comment"
              className="!text-red-500"
            >
              <Trash className="mr-2" /> Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
