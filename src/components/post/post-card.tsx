'use client';

import { ArrowBigUp, BadgeCheck, MessageSquareText } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Card, CardTitle } from '@/components/ui/card';
import { useUser } from '@/context/user-provider';
import { ISinglePost } from '@/types';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import FavoriteButton from './favorite-button';
import PostOptionButton from './post-option-button';

export default function PostCard({ post }: { post: ISinglePost }) {
  const { user: currentUser } = useUser();

  if (!post) return null;
  const { title, content, createdAt, author, votes, comments, images } = post;
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <Card className="flex flex-col p-4 border rounded-lg md:flex-row">
      <div className="flex-1 pr-0 md:pr-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center">
            <Link href={`/${author._id}`}>
              <Avatar>
                <AvatarImage
                  src={author.avatar}
                  alt={`${author.name}'s avatar`}
                  className="object-cover"
                />
                <AvatarFallback>{author.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
            </Link>

            <div className="ml-3">
              <Link href={`/${author._id}`}>
                <div className="flex items-center gap-1">
                  <CardTitle className="text-base font-semibold">
                    {author.name}
                  </CardTitle>
                  {author.isVerified && (
                    <BadgeCheck className="h-5 w-5 text-primary" />
                  )}
                </div>
                <div className="text-muted-foreground text-sm">
                  {formattedDate}
                </div>
              </Link>
            </div>
          </div>
          {post.premium && (
            <div className="hidden md:block mt-2">
              <Badge>Premium</Badge>
            </div>
          )}
        </div>

        {post.premium && (
          <div className="block md:hidden mb-2">
            <Badge>Premium</Badge>
          </div>
        )}
        {images.length > 0 && (
          <div className=" w-full pb-4 md:hidden">
            <Image
              src={images[0]}
              alt="Post Image"
              width={500}
              height={300}
              className="rounded-lg object-cover h-48"
              role="img"
            />
          </div>
        )}

        <Link
          href={`/${author._id}/posts/${post._id}`}
          className="cursor-pointer"
        >
          <CardTitle className="text-xl font-bold mb-2">{title}</CardTitle>
          <div
            className="post-content line-clamp-2 break-all overflow-hidden text-muted-foreground"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Link>

        <div className="flex items-center justify-between mt-4 text-muted-foreground">
          <Link
            href={`/${author._id}/posts/${post._id}`}
            className="cursor-pointer"
          >
            <div className="flex items-center">
              <div className="flex items-center mr-6">
                <ArrowBigUp className="h-5 w-5 mr-1" />
                <span>{votes}</span>
              </div>
              <div className="flex items-center">
                <MessageSquareText className="h-5 w-5 mr-1" />
                <span>{comments.length}</span>
              </div>
            </div>
          </Link>
          <div className="flex items-center">
            <FavoriteButton post={post} />

            {(post?.author?._id === currentUser?._id ||
              currentUser?.role === 'admin') && (
              <PostOptionButton post={post} currentUser={currentUser!} />
            )}
          </div>
        </div>
      </div>

      {images.length > 0 && (
        <div className="flex-none w-full md:w-1/3 relative mt-4 md:mt-0">
          <Image
            src={images[0]}
            alt="Post Image"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            role="img"
          />
        </div>
      )}
    </Card>
  );
}
