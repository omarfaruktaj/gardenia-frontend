import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import LoginForm from '../_components/login-form';

export default function Login() {
  return (
    <div>
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-8 overflow-hidden p-4  md:flex-row justify-between">
        <div className="flex w-full max-w-md flex-col justify-center">
          <Image src={'/static/logo.png'} height={100} width={100} alt="logo" />

          <h1 className="mb-4 text-center text-3xl font-bold text-green-700 md:text-left md:text-4xl">
            Welcome Back!
          </h1>
          <p className="text-justify text-lg">
            Log in to continue sharing and discovering the best gardening tips,
            advice, and content. Join our vibrant gardening community!
          </p>
        </div>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl text-green-700 md:text-2xl">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent>
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
