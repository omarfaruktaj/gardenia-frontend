import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { cn } from '@/lib/utils';

import { buttonVariants } from './button';

interface AlertModalProps {
  title?: string;
  description?: string;
  actionButtonText?: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function AlertModal({
  isOpen,
  onClose,
  onConfirm,
  loading,
  actionButtonText = 'Continue',
  title = 'Are you sure you want to proceed?',
  description = 'This action will mark the item for deletion, but it can be recovered if needed.',
}: AlertModalProps) {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };
  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-2">
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={cn(buttonVariants({ variant: 'destructive' }))}
            onClick={onConfirm}
            disabled={loading}
          >
            {actionButtonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
