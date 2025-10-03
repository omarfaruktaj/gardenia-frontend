import { BadgeCheck } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

import getLoginUser from '@/lib/get-login-user';
import { ISinglePost } from '@/types';

import Comments from '../comments/comments';
import FollowButton from '../follow-button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '../ui/hover-card';
import { Separator } from '../ui/separator';
import CommentButton from './comment-button';
import CopyURLButton from './copy-url-button';
import FavoriteButton from './favorite-button';
import GeneratePDFButton from './generate-pdf-button';
import PostBackButton from './post-back-button';
import VoteButton from './vote-button';

export default async function SinglePost({ post }: { post: ISinglePost }) {
  const currentUser = await getLoginUser();

  if (!currentUser) {
    return redirect('/login');
  }

  return (
    <div>
      <PostBackButton />
      <div className="lg:mx-auto max-w-4xl min-h-screen p-6 bg-background text-foreground">
        <div id={post._id} className="bg-background ">
          {post.images.length > 0 && (
            <Image
              src={post.images[0]}
              alt="Cover Image"
              height={300}
              width={600}
              className="w-full h-96 object-cover rounded-lg mb-8 shadow-lg"
            />
          )}
          <h1 className=" text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {post.title}
          </h1>
          <div>
            <Card className=" border-0 bg-transparent  shadow-sm">
              <CardHeader className="p-1">
                <div className="flex items-center justify-between">
                  <HoverCard>
                    <HoverCardTrigger>
                      <div className="flex items-center">
                        <Link href={`/${post.author._id}`}>
                          <Avatar>
                            <AvatarImage
                              src={post.author.avatar}
                              alt={`${post.author.name}'s avatar`}
                            />
                            <AvatarFallback>
                              {post.author.name.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        </Link>

                        <div className="ml-4">
                          <Link href={`/${post.author._id}`}>
                            <div className="flex items-center gap-2">
                              <CardTitle className="text-lg">
                                {post.author.name}
                              </CardTitle>
                              {post.author.isVerified && (
                                <BadgeCheck className="h-5 w-5 text-primary" />
                              )}
                            </div>
                            <CardDescription className="text-muted-foreground">
                              @{post.author.username}
                            </CardDescription>
                          </Link>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80 p-4">
                      <div className="flex items-start gap-4">
                        <Image
                          src={post.author.avatar || '/default-avatar.png'}
                          alt={`${post.author.name}'s avatar`}
                          width={48}
                          height={48}
                          className="rounded-full h-16 w-16 object-cover"
                        />
                        <div>
                          <h4 className="text-sm font-semibold leading-none">
                            {post.author.name}
                            {post.author.isVerified && (
                              <span className="ml-1 text-blue-500">✔️</span>
                            )}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            @{post.author.username}
                          </p>
                          <p className="mt-1 text-sm">{post.author.bio}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                        <div>
                          <strong>{post.author.followers.length}</strong>{' '}
                          Followers
                        </div>
                        <div>
                          <strong>{post.author.following.length}</strong>{' '}
                          Following
                        </div>
                        {typeof post.author.posts === 'number' && (
                          <div>
                            <strong>{post.author.posts}</strong> Posts
                          </div>
                        )}
                      </div>
                      {post.author.verificationEligible &&
                        !post.author.isVerified && (
                          <div className="mt-2 text-xs text-green-600 font-medium">
                            Eligible for verification
                          </div>
                        )}
                    </HoverCardContent>
                  </HoverCard>
                  {!(post.author._id === currentUser._id) && (
                    <FollowButton
                      user={post.author}
                      currentUser={currentUser}
                    />
                  )}
                </div>
              </CardHeader>
            </Card>
          </div>
          <div className="flex justify-between items-center text-muted-foreground mt-4 mb-8">
            <div>
              <span>By {post.author.name}</span> |{' '}
              <span>{new Date(post.createdAt).toLocaleDateString()}</span> |{' '}
              <span>Category: {post.category.name}</span>
            </div>
          </div>
          <div
            className="prose prose-lg max-w-none mb-12 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>

        <Separator className="border-border" />
        <div className="flex items-center justify-between my-4">
          <div className="flex items-center gap-x-3">
            <VoteButton currentUser={currentUser!} post={post} />
            <CommentButton totalComment={post.comments.length} />
          </div>
          <div className="flex items-center space-x-2">
            <CopyURLButton />
            <FavoriteButton post={post} />
            <GeneratePDFButton post={post} />
          </div>
        </div>
        <Separator className="border-border" />
        <Comments postId={post._id} />
      </div>
    </div>
  );
}
