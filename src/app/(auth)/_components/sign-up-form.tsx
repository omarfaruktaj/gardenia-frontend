'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
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
import type { TSignUpSchema } from '@/schemas/auth-schema';
import { signUpSchema } from '@/schemas/auth-schema';
import { singUp } from '@/services/auth-service';

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

export default function SignUpForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const watchedPassword = form.watch('password');
  const { strength, checks } = getPasswordStrength(watchedPassword || '');

  function onSubmit(values: TSignUpSchema) {
    setError(undefined);

    startTransition(async () => {
      const { data, error } = await singUp(values);

      if (error) {
        setError(error);
      }

      if (data) {
        queryClient.invalidateQueries({ queryKey: ['ME'] });
        router.push('/');
      }
    });
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Name Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-800 font-medium">
                  Full Name
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      {...field}
                      placeholder="Enter your full name"
                      className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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
                      className="pl-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password Field */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-green-800 font-medium">
                  Password
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Create a strong password"
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
                    </div>
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
            disabled={isPending}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium py-2.5 transition-all duration-200"
          >
            {isPending ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              'Create Account'
            )}
          </Button>
        </form>
      </Form>

      {/* Sign In Link */}
      <div className="text-center">
        <p className="text-sm text-green-600">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-medium text-green-700 hover:text-green-800 underline underline-offset-4"
          >
            Sign in here
          </Link>
        </p>
      </div>

      {/* Terms */}
      {/* <div className="text-center">
        <p className="text-xs text-green-600">
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="underline hover:text-green-800">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="underline hover:text-green-800">
            Privacy Policy
          </Link>
        </p>
      </div> */}
    </div>
  );
}
