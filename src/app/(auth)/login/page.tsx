import { Clock, Leaf, Shield, TrendingUp, Users } from 'lucide-react';
import Image from 'next/image';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

import LoginForm from '../_components/login-form';

export default function Login() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/static/leaf-pattern.svg')] opacity-5" />

      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Welcome Back Content */}
          <div className="space-y-8">
            {/* Logo & Welcome */}
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
                Welcome
                <span className="block text-green-600">Back!</span>
              </h1>
              <p className="text-lg text-green-700/80 max-w-md mx-auto lg:mx-0">
                Continue your gardening journey with our community of passionate
                growers and experts
              </p>
            </div>

            {/* Recent Activity */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
              <h3 className="font-semibold text-green-800 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                What&apos;s Growing Today
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="h-4 w-4 text-green-600" />
                    </div>
                    <span className="text-sm text-green-700">
                      New members joined today
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-700"
                  >
                    +24
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Leaf className="h-4 w-4 text-blue-600" />
                    </div>
                    <span className="text-sm text-green-700">
                      Posts shared this week
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-blue-100 text-blue-700"
                  >
                    156
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <Shield className="h-4 w-4 text-orange-600" />
                    </div>
                    <span className="text-sm text-green-700">
                      Expert tips available
                    </span>
                  </div>
                  <Badge
                    variant="secondary"
                    className="bg-orange-100 text-orange-700"
                  >
                    89
                  </Badge>
                </div>
              </div>
            </div>

            {/* Quick Access Features */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-400 to-green-500 rounded-xl p-4 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">Quick Access</span>
                </div>
                <p className="text-sm text-green-100">
                  Jump right back into your gardening discussions
                </p>
              </div>
              <div className="bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl p-4 text-white">
                <div className="flex items-center space-x-3 mb-2">
                  <Shield className="h-5 w-5" />
                  <span className="font-semibold">Secure Login</span>
                </div>
                <p className="text-sm text-blue-100">
                  Your account is protected with advanced security
                </p>
              </div>
            </div>

            {/* Community Highlight */}
            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-green-100">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                  SG
                </div>
                <div>
                  <p className="font-semibold text-green-800">Sarah Green</p>
                  <p className="text-sm text-green-600">
                    Garden Expert • Online now
                  </p>
                </div>
              </div>
              <p className="text-green-700 italic">
                &quot;Just shared my latest tomato growing guide! The community
                feedback has been amazing. 🍅&quot;
              </p>
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center lg:justify-end">
            <Card className="w-full max-w-md shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-6">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-800">Sign In</h2>
                <p className="text-green-600">
                  Welcome back to your garden community
                </p>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Features */}
        <div className="mt-16 text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-green-100">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">
                Expert Content
              </h3>
              <p className="text-sm text-green-600">
                Access premium guides and tutorials from gardening professionals
              </p>
            </div>
            <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-green-100">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">
                Active Community
              </h3>
              <p className="text-sm text-green-600">
                Connect with thousands of gardening enthusiasts worldwide
              </p>
            </div>
            <div className="bg-white/30 backdrop-blur-sm rounded-xl p-6 border border-green-100">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-green-800 mb-2">
                Secure Platform
              </h3>
              <p className="text-sm text-green-600">
                Your data and privacy are protected with enterprise-grade
                security
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
