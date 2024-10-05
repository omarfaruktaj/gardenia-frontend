import { Dialog, DialogContent } from './dialog';
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
      <DialogContent className="max-w-lg">
        <ScrollArea className="max-h-screen ">
          <div className="my-10">{children}</div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
