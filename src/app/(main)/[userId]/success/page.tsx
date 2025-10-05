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
          const paymentResult = await confirmPayment(session_id);
          if (paymentResult.error) {
            toast.error(paymentResult.error.message);
          }
          const userVerificationResult = await VerifyUser(params.userId);

          if (userVerificationResult.error) {
            toast.error(userVerificationResult.error.message);
          }
          toast.success('Successfully verified');
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          toast.error('Failed to confirm payment');
          // console.error('Failed to confirm payment:', error);
        }
      };

      confirm();
    }
  }, [session_id, params.userId]);

  return (
    <div className="flex items-center justify-center min-h-screen  px-4 bg-background">
      <Card className="max-w-md w-full shadow-xl rounded-lg ">
        <CardHeader>
          <div className="flex flex-col items-center text-center space-y-3 mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <CardTitle className="text-3xl font-bold text-green-600">
              Payment Successful!
            </CardTitle>
            <CardDescription className="text-base text-muted-foreground">
              Thank you for your payment. Your transaction has been completed.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-mute mb-6 text-center">
            You can now enjoy all the verified content and premium features.
          </p>
          <div className="flex justify-center">
            <Button
              asChild
              className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-200"
            >
              <Link href={'/'}>
                <ArrowLeft className="mr-2 h-4 w-4" /> Return to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuccessPage;
