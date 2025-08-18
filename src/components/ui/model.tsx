import { Dialog, DialogContent, DialogTitle } from './dialog';
import { ScrollArea } from './scroll-area';

interface ModelProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export default function Model({ isOpen, onClose, children }: ModelProps) {
  const onOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="flex max-h-[min(800px,90vh)] flex-col gap-0 p-0 max-w-4xl">
        <DialogTitle></DialogTitle>
        <ScrollArea className="flex max-h-full flex-col overflow-hidden">
          <div>{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
