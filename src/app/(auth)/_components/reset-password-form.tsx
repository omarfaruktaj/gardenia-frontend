'use client';

import { useEffect, useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Key,
  Lock,
  Shield,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
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
import { Progress } from '@/components/ui/progress';
import type { TResetPasswordSchema } from '@/schemas/auth-schema';
import { resetPasswordSchema } from '@/schemas/auth-schema';
import { resetPassword } from '@/services/auth-service';

// Password strength checker
const getPasswordStrength = (password: string) => {
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  strength = Object.values(checks).filter(Boolean).length;
  return { strength, checks };
};

const getStrengthColor = (strength: number) => {
  if (strength <= 2) return 'bg-red-500';
  if (strength <= 3) return 'bg-yellow-500';
  if (strength <= 4) return 'bg-blue-500';
  return 'bg-green-500';
};

const getStrengthText = (strength: number) => {
  if (strength <= 2) return 'Weak';
  if (strength <= 3) return 'Fair';
  if (strength <= 4) return 'Good';
  return 'Strong';
};

export default function ResetPasswordForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [success, setSuccess] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const queryClient = useQueryClient();

  const form = useForm<TResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const watchedPassword = form.watch('password');
  const watchedConfirmPassword = form.watch('confirmPassword');
  const { strength, checks } = getPasswordStrength(watchedPassword || '');

  const passwordsMatch =
    watchedPassword === watchedConfirmPassword &&
    watchedConfirmPassword.length > 0;

  useEffect(() => {
    if (!token) {
      console.error('Reset password token is missing');
      router.push('/login');
    }
  }, [token, router]);

  async function onSubmit(values: TResetPasswordSchema) {
    setError(undefined);

    startTransition(async () => {
      const { data, error } = await resetPassword(values.password, token!);

      if (error) {
        setError(error);
      }

      if (data) {
        queryClient.invalidateQueries({ queryKey: ['ME'] });
        setSuccess(true);
        // Redirect after showing success message
        setTimeout(() => {
          router.push('/');
        }, 2000);
      }
    });
  }

  if (success) {
    return (
      <div className="space-y-6 text-center">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <CheckCircle className="h-8 w-8 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Password Reset Successful!
          </h3>
          <p className="text-sm text-green-600">
            Your password has been updated successfully.
          </p>
        </div>
        <Alert className="border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-700">
            You&apos;re being redirected to your dashboard. You can now sign in
            with your new password.
          </AlertDescription>
        </Alert>
        <div className="flex justify-center">
          <div className="w-6 h-6 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* New Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-800 font-medium">
                  New Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your new password"
                      className="pl-10 pr-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                      disabled={isPending}
                      onFocus={() => setPasswordFocused(true)}
                      onBlur={() => setPasswordFocused(false)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isPending}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-green-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-green-500" />
                      )}
                    </Button>
                  </div>
                </FormControl>

                {/* Password Strength Indicator */}
                {(passwordFocused || watchedPassword) && watchedPassword && (
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-600">
                        Password strength:
                      </span>
                      <span
                        className={`text-xs font-medium ${getStrengthColor(strength).replace('bg-', 'text-')}`}
                      >
                        {getStrengthText(strength)}
                      </span>
                    </div>
                    <Progress value={(strength / 5) * 100} className="h-2" />
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div
                        className={`flex items-center space-x-1 ${checks.length ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span>8+ characters</span>
                      </div>
                      <div
                        className={`flex items-center space-x-1 ${checks.uppercase ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span>Uppercase</span>
                      </div>
                      <div
                        className={`flex items-center space-x-1 ${checks.lowercase ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span>Lowercase</span>
                      </div>
                      <div
                        className={`flex items-center space-x-1 ${checks.number ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span>Number</span>
                      </div>
                      <div
                        className={`flex items-center space-x-1 ${checks.special ? 'text-green-600' : 'text-gray-400'}`}
                      >
                        <CheckCircle className="h-3 w-3" />
                        <span>Special char</span>
                      </div>
                    </div>
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password Field */}
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-800 font-medium">
                  Confirm New Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Shield className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      {...field}
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm your new password"
                      className="pl-10 pr-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                      disabled={isPending}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      disabled={isPending}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-green-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-green-500" />
                      )}
                    </Button>
                  </div>
                </FormControl>

                {/* Password Match Indicator */}
                {watchedConfirmPassword && (
                  <div className="flex items-center space-x-2 mt-1">
                    {passwordsMatch ? (
                      <>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-xs text-green-600">
                          Passwords match
                        </span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="h-4 w-4 text-red-500" />
                        <span className="text-xs text-red-600">
                          Passwords don&apos;t match
                        </span>
                      </>
                    )}
                  </div>
                )}

                <FormMessage />
              </FormItem>
            )}
          />

          {/* Error Alert */}
          {error && (
            <Alert variant="destructive" className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isPending || !passwordsMatch || strength < 3}
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-medium py-2.5 transition-all duration-200"
          >
            {isPending ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Resetting Password...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Key className="h-4 w-4" />
                <span>Reset Password</span>
              </div>
            )}
          </Button>
        </form>
      </Form>

      {/* Security Notice */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-4">
          <div className="flex items-start space-x-3">
            <Shield className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-blue-800 mb-1">Security Notice</p>
              <p className="text-blue-700">
                After resetting your password, you&apos;ll be automatically
                signed in and this reset link will expire for security.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
    </div>
  );
}
