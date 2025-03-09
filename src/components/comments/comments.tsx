import api from '@/config/axios';
import { CommentResponse } from '@/types';

import CommentForm from './comment-form';
import CommentItem from './comment-item';

export default async function Comments({ postId }: { postId: string }) {
  const result = await api.get(`/posts/${postId}/comments`);
  const comments: CommentResponse[] = result.data.data;

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold  mb-4">Comments</h3>

      <CommentForm postId={postId} />
      <div className="space-y-4 mt-5">
        {comments.length > 0 ? (
          comments.map((comment: CommentResponse) => (
            <CommentItem key={comment._id} comment={comment} />
          ))
        ) : (
          <p className="text-muted-foreground">No comments yet.</p>
        )}
      </div>
    </div>
  );
}
