import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

interface FormErrorProps {
  message?: string;
}

export const ErrorCard = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="flex items-center gap-x-2 rounded-md border border-rose-900 bg-destructive/25 p-3 text-sm text-rose-700">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
