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
      <Card className="border-0 shadow-md">
        <CardHeader className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-start space-x-2">
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
                <Link href={`/${comment.user._id}`}>
                  <div className="flex items-center gap-2">
                    <CardTitle>{comment.user.name}</CardTitle>
                    {comment.user.isVerified && (
                      <BadgeCheck className="h-5 w-5 text-primary mt-1" />
                    )}
                  </div>
                  <CardDescription className="text-muted-foreground text-sm">
                    {new Intl.DateTimeFormat('en-US').format(
                      new Date(comment.createdAt)
                    )}
                  </CardDescription>
                </Link>
              </div>
            </div>
            {user?._id === comment.user._id ? (
              <DropdownMenu>
                <DropdownMenuTrigger aria-label="Options">
                  <EllipsisVertical />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    onClick={() => setOpenModel(true)}
                    aria-label="Edit Comment"
                  >
                    <Edit className="mr-2" /> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onDelete}
                    aria-label="Delete Comment"
                    className="!text-red-500"
                  >
                    <Trash className="mr-2" /> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : null}
          </div>
        </CardHeader>
        <CardContent>
          <p>{comment.content}</p>
        </CardContent>
      </Card>
    </div>
  );
}
