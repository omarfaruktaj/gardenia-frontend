'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import {
  AlertCircle,
  Eye,
  EyeOff,
  Lock,
  LogIn,
  Mail,
  Shield,
  User,
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
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
import type { TLoginSchema } from '@/schemas/auth-schema';
import { loginSchema } from '@/schemas/auth-schema';
import { login } from '@/services/auth-service';
import { getCurrentUser } from '@/services/user-service';

export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>(undefined);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<TLoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: TLoginSchema) {
    setError(undefined);

    startTransition(async () => {
      const { data, error } = await login(values);

      if (error) {
        setError(error);
      }

      if (data) {
        queryClient.invalidateQueries({ queryKey: ['ME'] });
        await getCurrentUser();
        router.push('/');
      }
    });
  }

  function handleDemoLogin(userType: 'demo' | 'admin') {
    const demoCredentials = {
      demo: { email: 'user@gmail.com', password: 'user123' },
      admin: { email: 'admin@gmail.com', password: 'admin123' },
    };

    const credentials = demoCredentials[userType];

    form.setValue('email', credentials.email);
    form.setValue('password', credentials.password);

    onSubmit({ email: credentials.email, password: credentials.password });
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
                <div className="flex items-center justify-between">
                  <FormLabel className="text-green-800 font-medium">
                    Password
                  </FormLabel>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-green-600 hover:text-green-700 underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-green-500" />
                    <Input
                      {...field}
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="pl-10 pr-10 border-green-200 focus:border-green-400 focus:ring-green-400"
                      disabled={isPending}
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
                <span>Signing In...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </div>
            )}
          </Button>
        </form>
      </Form>

      {/* Demo Login Section */}
      <div className="space-y-3">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-green-200" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-green-600">
              Quick Demo Access
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="flex items-center space-x-2 border-blue-200 hover:bg-blue-50 hover:text-blue-700 "
            type="button"
            disabled={isPending}
            onClick={() => handleDemoLogin('demo')}
          >
            <User className="h-4 w-4" />
            <span>Demo User</span>
          </Button>
          <Button
            variant="outline"
            className="flex items-center space-x-2 border-purple-200 hover:bg-purple-50 hover:text-purple-700"
            type="button"
            disabled={isPending}
            onClick={() => handleDemoLogin('admin')}
          >
            <Shield className="h-4 w-4" />
            <span>Admin Demo</span>
          </Button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start space-x-2">
            <div className="flex-shrink-0">
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 text-xs"
              >
                Demo
              </Badge>
            </div>
            <div className="text-xs text-blue-700">
              <p className="font-medium mb-1">Try without signing up!</p>
              <p>Use demo accounts to explore all features instantly.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-sm text-green-600">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-medium text-green-700 hover:text-green-800 underline underline-offset-4"
          >
            Sign up here
          </Link>
        </p>
      </div>

      {/* Security Notice */}
      <div className="text-center">
        <p className="text-xs text-green-600 flex items-center justify-center space-x-1">
          <Shield className="h-3 w-3" />
          <span>Your login is secured with 256-bit encryption</span>
        </p>
      </div>
    </div>
  );
}
