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
      <DialogContent className="max-w-3xl">
        <DialogTitle></DialogTitle>
        <ScrollArea className="max-h-screen ">
          <div className="mb-10">{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
