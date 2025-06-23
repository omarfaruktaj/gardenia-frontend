'use client';

import { useState } from 'react';

import { BadgeCheck, Edit, EllipsisVertical, Trash } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUser } from '@/context/user-provider';
import { deleteComment } from '@/services/comment-service';
import { CommentResponse } from '@/types';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import EditComment from './comment-edit-model';

interface CommentItemProps {
  comment: CommentResponse;
}

export default function CommentItem({ comment }: CommentItemProps) {
  const [openModel, setOpenModel] = useState(false);
  const { user } = useUser();

  const onDelete = async () => {
    const { data, error } = await deleteComment(comment._id);

    if (data) {
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <EditComment
        postId={comment.post}
        data={comment}
        onClose={() => setOpenModel(false)}
        isOpen={openModel}
      />
      <Card className="bg-muted/50 border-0 shadow-sm rounded-lg">
        <CardHeader className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <Link href={`/${comment.user._id}`}>
                <Avatar>
                  <AvatarImage
                    src={comment.user.avatar}
                    alt={`${comment.user.name}'s avatar`}
                  />
                  <AvatarFallback>
                    {comment.user.name.slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div>
                <Link
                  href={`/${comment.user._id}`}
                  className="flex items-center gap-2"
                >
                  <CardTitle className="text-base font-semibold">
                    {comment.user.name}
                  </CardTitle>
                  {comment.user.isVerified && (
                    <BadgeCheck className="h-4 w-4 text-primary" />
                  )}
                </Link>
                <CardDescription className="text-xs">
                  {new Intl.DateTimeFormat('en-US', {
                    dateStyle: 'medium',
                    timeStyle: 'short',
                  }).format(new Date(comment.createdAt))}
                </CardDescription>
              </div>
            </div>
            {user?._id === comment.user._id && (
              <DropdownMenu>
                <DropdownMenuTrigger aria-label="Options">
                  <EllipsisVertical className="h-5 w-5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setOpenModel(true)}>
                    <Edit className="mr-2 h-4 w-4" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onDelete}
                    className="!text-red-500"
                  >
                    <Trash className="mr-2 h-4 w-4" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </CardHeader>
        <CardContent className="px-4 pb-4">
          <p className="text-sm">{comment.content}</p>
        </CardContent>
      </Card>
    </div>
  );
}
