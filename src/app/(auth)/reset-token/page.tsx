import { Suspense } from 'react';

import { ResetPasswordFormSkeleton } from '@/components/skeleton/reset-password-form-skeleton';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import ResetPasswordForm from '../_components/reset-password-form';

export default function ResetPassword() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Reset Your Password</CardTitle>
        <CardDescription>
          Enter your new password below to reset it.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Suspense fallback={<ResetPasswordFormSkeleton />}>
          <ResetPasswordForm />
        </Suspense>
      </CardContent>
    </Card>
  );
}
