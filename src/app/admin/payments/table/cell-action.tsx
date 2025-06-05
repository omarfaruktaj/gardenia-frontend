'use client';

import { useTransition } from 'react';

import {
  Copy,
  Download,
  ExternalLink,
  Eye,
  MoreHorizontal,
} from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { IPayment } from '@/types';

export function CellAction({ data }: { data: IPayment }) {
  const [isPending, startTransition] = useTransition();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success('Transaction ID copied to clipboard');
  };

  const onViewDetails = () => {
    // Implement view details functionality
    toast.info('Opening transaction details...');
  };

  const onDownloadReceipt = () => {
    startTransition(async () => {
      // Implement download receipt functionality
      toast.success('Receipt downloaded successfully');
    });
  };

  // const onRefund = () => {
  //   startTransition(async () => {
  //     // Implement refund functionality
  //     toast.success('Refund initiated successfully');
  //   });
  // };

  const onViewInGateway = () => {
    // Open payment gateway link
    toast.info('Opening in payment gateway...');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Transaction Actions</DropdownMenuLabel>

        <DropdownMenuItem className="cursor-pointer" onClick={onViewDetails}>
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => onCopy(data.transactionID)}
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy Transaction ID
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={onDownloadReceipt}
          disabled={isPending}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Receipt
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="cursor-pointer" onClick={onViewInGateway}>
          <ExternalLink className="mr-2 h-4 w-4" />
          View in Gateway
        </DropdownMenuItem>

        {/* {data.status === 'completed' && (
          <DropdownMenuItem
            className="cursor-pointer text-orange-600 focus:text-orange-600"
            onClick={onRefund}
            disabled={isPending}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Process Refund
          </DropdownMenuItem>
        )} */}

        {/* {(data. === 'failed' || data.status === 'pending') && (
          <DropdownMenuItem className="cursor-pointer" disabled={isPending}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            Retry Payment
          </DropdownMenuItem>
        )} */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
