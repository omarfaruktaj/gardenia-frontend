'use client';

import { useEffect } from 'react';

import { ArrowLeft, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { confirmPayment } from '@/services/payment-service';
import { VerifyUser } from '@/services/user-service';

const SuccessPage = ({ params }: { params: { userId: string } }) => {
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  useEffect(() => {
    if (session_id) {
      const confirm = async () => {
        try {
          await confirmPayment(session_id);
          await VerifyUser(params.userId);
          toast.success('Successfully verified');
        } catch (error) {
          console.error('Failed to confirm payment:', error);
        }
      };

      confirm();
    }
  }, [session_id, params.userId]);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-600 text-center">
            Payment Successful!
          </CardTitle>
          <CardDescription className="text-lg text-center">
            Thank you for your payment. Your transaction has been completed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-md text-gray-600 mb-6 text-center">
            You can now enjoy the verified content and features.
          </p>
          <div className="flex justify-center">
            <Button asChild>
              <Link href={'/'}>
                <ArrowLeft className="mr-2" /> Return to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
