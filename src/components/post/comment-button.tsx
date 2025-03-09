import { MessageSquareText } from 'lucide-react';

import { Button } from '../ui/button';

export default function CommentButton({
  totalComment,
}: {
  totalComment: number;
}) {
  return (
    <Button
      variant={'ghost'}
      size={'sm'}
      className="rounded-full flex items-center gap-x-2"
    >
      <MessageSquareText /> <div className="mb-1">{totalComment}</div>
    </Button>
  );
}
