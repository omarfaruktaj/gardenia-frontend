import { ArrowLeft, CheckCircle, Clock, Mail, Shield } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import ForgotPasswordForm from '../_components/forgot-password-form';

export default function ForgotPassword() {
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
          {/* Left Side - Information & Reassurance */}
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
                Password
                <span className="block text-green-600">Recovery</span>
              </h1>
              <p className="text-lg text-green-700/80 max-w-md mx-auto lg:mx-0">
                Don&apos;t worry! Password recovery is quick and secure.
                We&apos;ll help you get back to your garden community.
              </p>
            </div>

            {/* Recovery Process Steps */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
              <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                How Password Recovery Works
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-semibold text-sm">
                    1
                  </div>
                  <div>
                    <p className="font-medium text-green-800">
                      Enter Your Email
                    </p>
                    <p className="text-sm text-green-600">
                      Provide the email address associated with your account
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold text-sm">
                    2
                  </div>
                  <div>
                    <p className="font-medium text-green-800">
                      Check Your Email
                    </p>
                    <p className="text-sm text-green-600">
                      We&apos;ll send a secure reset link to your inbox
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-semibold text-sm">
                    3
                  </div>
                  <div>
                    <p className="font-medium text-green-800">
                      Create New Password
                    </p>
                    <p className="text-sm text-green-600">
                      Follow the link to set up a new secure password
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Security Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="h-5 w-5" />
                  <span className="font-semibold">Secure Process</span>
                </div>
                <p className="text-sm text-green-100">
                  Your reset link is encrypted and expires in 1 hour
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">Quick Recovery</span>
                </div>
                <p className="text-sm text-blue-100">
                  Most users receive their reset email within 2 minutes
                </p>
              </div>
            </div>

            {/* Help & Support */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
              <h3 className="font-semibold text-green-800 mb-3">
                Need Additional Help?
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    Check your spam/junk folder if you don&apos;t see the email
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>
                    Make sure you&apos;re using the correct email address
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-green-700">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Contact support if you continue having issues</span>
                </div>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full border-green-200 hover:bg-green-50"
              >
                Contact Support Team
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm text-green-600">
                <div className="flex items-center space-x-1">
                  <Shield className="h-4 w-4" />
                  <span>SSL Encrypted</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Mail className="h-4 w-4" />
                  <span>Secure Email</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>1 Hour Expiry</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Reset Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center mb-4">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800">
                  Reset Password
                </h2>
                <p className="text-green-600">
                  Enter your email to receive a reset link
                </p>
              </CardHeader>
              <CardContent>
                <ForgotPasswordForm />
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
                Your Security is Our Priority
              </h3>
            </div>
            <p className="text-sm text-green-600">
              We use industry-standard security measures to protect your
              account. Reset links are single-use and expire automatically for
              your protection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
