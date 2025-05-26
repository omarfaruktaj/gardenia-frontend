'use client';

import { useState } from 'react';

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
  const [votesCount, setVotesCount] = useState<number>(post.votes);
  const [userVote, setUserVote] = useState<VoteType | null>(() => {
    const userVote = post?.allVotes?.find(
      (vote) => vote?.user === currentUser?._id
    );
    return userVote?.voteType ?? null;
  });

  const handleVote = async (voteType: 'upvote' | 'downvote') => {
    // Optimistic update
    let newVotes = votesCount;

    if (voteType === 'upvote') {
      if (userVote === VoteType.Upvote) {
        setUserVote(null);
        newVotes -= 1;
      } else {
        setUserVote(VoteType.Upvote);
        newVotes += userVote === VoteType.Downvote ? 2 : 1;
      }
    } else {
      if (userVote === VoteType.Downvote) {
        setUserVote(null);
        newVotes += 1;
      } else {
        setUserVote(VoteType.Downvote);
        newVotes -= userVote === VoteType.Upvote ? 2 : 1;
      }
    }

    setVotesCount(newVotes);

    // Send to server
    const result = await votePost({ postId: post._id, voteType });

    if (result.error) {
      toast.error(result.error.message);
      // Revert if error
      setVotesCount(post.votes);
      const originalVote = post.allVotes.find(
        (vote) => vote.user === currentUser._id
      );
      setUserVote(originalVote?.voteType ?? null);
    }
  };

  return (
    <div>
      <div className="inline-flex items-center border rounded-full">
        <Button
          variant="outline"
          className={cn(
            'p-2 border-0 rounded-l-full flex items-center gap-1',
            userVote === VoteType.Upvote &&
              'text-primary bg-primary/20 hover:text-primary'
          )}
          onClick={() => handleVote('upvote')}
        >
          <ArrowBigUp />
          <span className="pl-1">{votesCount}</span>
        </Button>

        <Button
          variant="outline"
          className={cn(
            'p-2 border-0 rounded-r-full',
            userVote === VoteType.Downvote &&
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
