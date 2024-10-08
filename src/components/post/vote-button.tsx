'use client';

import { ArrowBigDown, ArrowBigUp } from 'lucide-react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';
import { votePost } from '@/services/post-service';
import { ISinglePost, UserResponse, VoteType } from '@/types';

import { Button } from '../ui/button';

export default function VoteButton({
  post,
  currentUser,
}: {
  post: ISinglePost;
  currentUser: UserResponse;
}) {
  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    const result = await votePost({ postId: post?._id, voteType });

    if (result.error) {
      toast.error(result.error.message);
    }
  };

  const isUserUpVoted = post?.allVotes?.find(
    (vote) =>
      vote?.user === currentUser?._id && vote?.voteType === VoteType?.Upvote
  );
  const isUserDownVoted = post.allVotes.find(
    (vote) =>
      vote.user === currentUser?._id && vote?.voteType === VoteType?.Downvote
  );

  return (
    <div>
      <div className="inline-flex items-center border  rounded-full">
        <Button
          variant={'outline'}
          className={cn(
            'p-2 border-0 rounded-l-full flex items-center gap-1',
            isUserUpVoted && 'text-primary bg-primary/20 hover:text-primary'
          )}
          onClick={() => handleVote('upvote')}
        >
          <ArrowBigUp />
          <span className="pl-1">{post.votes}</span>
        </Button>

        <Button
          variant={'outline'}
          className={cn(
            'p-2 border-0 rounded-r-full',
            isUserDownVoted &&
              'text-destructive bg-destructive/20 hover:text-destructive'
          )}
          onClick={() => handleVote('downvote')}
        >
          <ArrowBigDown />
        </Button>
      </div>
    </div>
  );
}
