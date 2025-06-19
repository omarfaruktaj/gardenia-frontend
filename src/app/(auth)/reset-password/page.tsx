import { Suspense } from 'react';

import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle,
  Lock,
  Shield,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { ResetPasswordFormSkeleton } from '@/components/skeleton/reset-password-form-skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import ResetPasswordForm from '../_components/reset-password-form';

export default function ResetPassword() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/static/leaf-pattern.svg')] opacity-5" />

      {/* Header */}
      <div className="relative z-10 p-4">
        <Button variant="ghost" asChild className="mb-4">
          <Link
            href="/login"
            className="flex items-center space-x-2 text-green-700 hover:text-green-800"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Login</span>
          </Link>
        </Button>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Security Information */}
          <div className="space-y-8">
            {/* Logo & Title */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-200 rounded-full blur-xl opacity-30" />
                  <Image
                    src="/static/logo.png"
                    height={80}
                    width={80}
                    alt="Gardening Community Logo"
                    className="relative z-10"
                  />
                </div>
              </div>
              <h1 className="text-4xl lg:text-5xl font-bold text-green-800 mb-4">
                Create New
                <span className="block text-green-600">Password</span>
              </h1>
              <p className="text-lg text-green-700/80 max-w-md mx-auto lg:mx-0">
                You&apos;re almost done! Create a strong, secure password to
                protect your gardening community account.
              </p>
            </div>

            {/* Password Requirements */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
              <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Password Requirements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-green-700">
                    At least 8 characters long
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-green-700">
                    Include uppercase and lowercase letters
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-green-700">
                    Include at least one number
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-green-700">
                    Include a special character (!@#$%^&*)
                  </span>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <Lock className="h-5 w-5" />
                  <span className="font-semibold">Secure Reset</span>
                </div>
                <p className="text-sm text-green-100">
                  Your password is encrypted and stored securely
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="h-5 w-5" />
                  <span className="font-semibold">One-Time Link</span>
                </div>
                <p className="text-sm text-blue-100">
                  This reset link can only be used once for security
                </p>
              </div>
            </div>

            {/* Security Tips */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
              <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                <AlertTriangle className="h-5 w-5 mr-2 text-orange-500" />
                Password Security Tips
              </h3>
              <div className="space-y-3 text-sm text-green-700">
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Use a unique password that you don&apos;t use elsewhere
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Consider using a password manager for better security
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span>
                    Avoid using personal information like names or dates
                  </span>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                  <span>Make it memorable but hard for others to guess</span>
                </div>
              </div>
            </div>

            {/* What Happens Next */}
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <h3 className="font-semibold text-blue-800 mb-3">
                What Happens Next?
              </h3>
              <div className="space-y-2 text-sm text-blue-700">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                    1
                  </div>
                  <span>Your password will be updated immediately</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                    2
                  </div>
                  <span>You&apos;ll be automatically signed in</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-xs">
                    3
                  </div>
                  <span>You can continue using your account normally</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Reset Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mb-4">
                  <Lock className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800">
                  Reset Password
                </h2>
                <p className="text-green-600">
                  Create a strong, secure password
                </p>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<ResetPasswordFormSkeleton />}>
                  <ResetPasswordForm />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Security Notice */}
        <div className="mt-16 text-center">
          <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-green-100 max-w-2xl mx-auto">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Shield className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-green-800">
                Secure Password Reset
              </h3>
            </div>
            <p className="text-sm text-green-600">
              This password reset link is secure, encrypted, and can only be
              used once. After resetting your password, the link will expire
              automatically.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
