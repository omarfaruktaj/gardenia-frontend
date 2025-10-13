'use client';

import { useRef } from 'react';

import { ISinglePost, IUser } from '@/types';

import Comments from '../comments/comments';
import CommentButton from './comment-button';
import CopyURLButton from './copy-url-button';
import FavoriteButton from './favorite-button';
import GeneratePDFButton from './generate-pdf-button';
import VoteButton from './vote-button';

interface PostInteractionsProps {
  post: ISinglePost;
  currentUser: IUser;
}

export default function PostInteractions({
  post,
  currentUser,
}: PostInteractionsProps) {
  const commentInputRef = useRef<HTMLTextAreaElement | null>(null);

  const handleCommentClick = () => {
    commentInputRef.current?.focus();
  };

  return (
    <>
      <div className="flex items-center justify-between my-4">
        <div className="flex items-center gap-x-3">
          <VoteButton currentUser={currentUser} post={post} />
          <CommentButton
            totalComment={post.comments.length}
            onClick={handleCommentClick}
          />
        </div>
        <div className="flex items-center space-x-2">
          <CopyURLButton />
          <FavoriteButton post={post} />
          <GeneratePDFButton post={post} />
        </div>
      </div>
      <Comments postId={post._id} commentInputRef={commentInputRef} />
    </>
  );
}
