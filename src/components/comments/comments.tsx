import api from '@/config/axios';
import { CommentResponse } from '@/types';

import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import CommentForm from './comment-form';
import CommentItem from './comment-item';

export default async function Comments({ postId }: { postId: string }) {
  const result = await api.get(`/posts/${postId}/comments`);
  const comments: CommentResponse[] = result.data.data;

  return (
    <Card className="mt-12 shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Comments</CardTitle>
      </CardHeader>
      <CardContent>
        <CommentForm postId={postId} />
        <div className="space-y-6 mt-8">
          {comments.length > 0 ? (
            comments.map((comment: CommentResponse) => (
              <CommentItem key={comment._id} comment={comment} />
            ))
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No comments yet. Be the first to comment!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
