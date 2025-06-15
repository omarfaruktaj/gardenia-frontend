import { BookOpen, Leaf, Star, Users } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

import SignUpForm from '../_components/sign-up-form';

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/static/leaf-pattern.svg')] opacity-5" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Branding & Features */}
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
                Gardening
                <span className="block text-green-600">Community</span>
              </h1>
              <p className="text-lg text-green-700/80 max-w-md mx-auto lg:mx-0">
                Join thousands of gardening enthusiasts sharing knowledge, tips,
                and growing together
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Connect</h3>
                  <p className="text-sm text-green-600">
                    Join a community of passionate gardeners
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Learn</h3>
                  <p className="text-sm text-green-600">
                    Access expert guides and tutorials
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Leaf className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Grow</h3>
                  <p className="text-sm text-green-600">
                    Share your garden journey and progress
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-green-800">Premium</h3>
                  <p className="text-sm text-green-600">
                    Unlock exclusive content and features
                  </p>
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-semibold">
                  MJ
                </div>
                <div>
                  <p className="font-semibold text-green-800">Maria Johnson</p>
                  <p className="text-sm text-green-600">Master Gardener</p>
                </div>
              </div>
              <p className="text-green-700 italic">
                &quot;This community transformed my gardening journey. The tips
                and support I&apos;ve received are invaluable!&quot;
              </p>
            </div>
          </div>

          {/* Right Side - Sign Up Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4">
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800">
                  Create Account
                </h2>
                <p className="text-green-600">
                  Start your gardening journey today
                </p>
              </CardHeader>
              <CardContent>
                <SignUpForm />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div>
              <div className="text-2xl font-bold text-green-800">10K+</div>
              <div className="text-sm text-green-600">Active Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-800">500+</div>
              <div className="text-sm text-green-600">Expert Guides</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-800">50K+</div>
              <div className="text-sm text-green-600">Plants Grown</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-800">24/7</div>
              <div className="text-sm text-green-600">Community Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
