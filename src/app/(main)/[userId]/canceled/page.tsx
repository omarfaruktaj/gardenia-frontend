import { ArrowLeft, XCircle } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Canceled() {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <Card className="max-w-md w-full">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <XCircle className="h-16 w-16 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-center text-red-600">
            Payment Canceled
          </CardTitle>
          <CardDescription className="text-center ">
            We&apos;re sorry to inform you that your payment was not completed.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Button variant={'destructive'} asChild>
              <Link href={'/'}>
                <ArrowLeft className="mr-2" /> Return to Home
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
