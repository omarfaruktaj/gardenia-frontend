'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  Mail,
  Send,
} from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import type { TForgotPasswordSchema } from '@/schemas/auth-schema';
import { forgotPasswordSchema } from '@/schemas/auth-schema';
import { forgotPassword } from '@/services/auth-service';

export default function ForgotPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<TForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const watchedEmail = form.watch('email');

  function onSubmit(values: TForgotPasswordSchema) {
    setError(undefined);
    setSuccess(undefined);

    startTransition(async () => {
      const { success, error } = await forgotPassword(values);

      if (error) {
        setError(error);
      }

      if (success) {
        setSuccess(success);
        setEmailSent(true);
      }
    });
  }

  const handleResendEmail = () => {
    if (watchedEmail) {
      onSubmit({ email: watchedEmail });
    }
  };

  if (emailSent && success) {
    return (
      <div className="space-y-6">
        {/* Success State */}
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-green-800 mb-2">
              Email Sent Successfully!
            </h3>
            <p className="text-sm text-green-600">
              We&apos;ve sent a password reset link to{' '}
              <span className="font-medium">{watchedEmail}</span>
            </p>
          </div>
        </div>

        {/* Success Alert */}
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            {success}
          </AlertDescription>
        </Alert>

        {/* Next Steps */}
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-4">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">
                  What&apos;s Next?
                </span>
              </div>
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Check your email inbox (and spam folder)</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Click the reset link in the email</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Create your new password</span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Sign in with your new password</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleResendEmail}
            disabled={isPending}
            variant="outline"
            className="w-full "
          >
            {isPending ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                <span>Resending...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>Resend Email</span>
              </div>
            )}
          </Button>

          <Button asChild variant="link" className="w-full">
            <Link href="/login" className="flex items-center space-x-2">
              <span>Back to Login</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-xs text-green-600">
            Didn&apos;t receive the email? Check your spam folder or{' '}
            <button
              onClick={handleResendEmail}
              className="underline hover:text-green-800"
              disabled={isPending}
            >
              resend the link
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-800 font-medium">
                  Email Address
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your email address"
                      className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400 text-green-800"
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error Alert */}
          {error && (
            <Alert
              variant="destructive"
              className="border-red-200 bg-red-50 flex items-center "
            >
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="mt-1">{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-medium py-2.5 transition-all duration-200"
          >
            {isPending ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Sending Reset Link...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Send Reset Link</span>
              </div>
            )}
          </Button>
        </form>
      </Form>

      {/* Help Section */}
      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <Mail className="h-4 w-4 text-blue-600" />
          </div>
          <div className="text-sm">
            <p className="font-medium text-gray-800 mb-1">
              Email Delivery Tips
            </p>
            <ul className="text-gray-600 space-y-1">
              <li>• Check your spam/junk folder</li>
              <li>• Make sure the email address is correct</li>
              <li>• Allow up to 5 minutes for delivery</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Back to Login */}
      <div className="text-center">
        <p className="text-sm text-green-600">
          Remember your password?{' '}
          <Link
            href="/login"
            className="font-medium text-green-700 hover:text-green-800 underline underline-offset-4"
          >
            Back to Login
          </Link>
        </p>
      </div>

      {/* Security Notice */}
      <div className="text-center">
        <p className="text-xs text-green-600 flex items-center justify-center space-x-1">
          <Clock className="h-3 w-3" />
          <span>Reset links expire in 1 hour for security</span>
        </p>
      </div>
    </div>
  );
}
