import { DialogTitle } from '@radix-ui/react-dialog';

import { Dialog, DialogContent } from '@/components/ui/dialog';
import { CommentResponse } from '@/types';

import CommentForm from './comment-form';

interface EditCommentProps {
  isOpen: boolean;
  onClose: () => void;
  data: CommentResponse;
  postId: string;
}
export default function EditComment({
  data,
  postId,
  isOpen,
  onClose,
}: EditCommentProps) {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="">
        <DialogTitle className="text-center text-xl ">Edit Comment</DialogTitle>

        <CommentForm onClose={onClose} postId={postId} initialData={data} />
      </DialogContent>
    </Dialog>
  );
}
