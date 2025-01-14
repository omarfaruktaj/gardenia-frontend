import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import RegisterForm from '../_components/sign-up-form';

export default function SignUp() {
  return (
    <div>
      <div className="mx-auto flex w-full  flex-col items-center gap-8 overflow-hidden  p-4  md:flex-row">
        <div className="flex w-full max-w-lg flex-col justify-center">
          <Image src={'/static/logo.png'} height={100} width={100} alt="logo" />
          <h1 className="mb-4 text-center text-3xl font-bold text-green-700 md:text-left md:text-4xl">
            Gardening Community
          </h1>
          <p className="text-justify text-lg">
            Discover tips, guides, and advice from gardening enthusiasts and
            professionals. Share your gardening knowledge, connect with others,
            and access exclusive content to help your garden thrive!
          </p>
        </div>
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-xl text-green-700 md:text-2xl">
              Sign Up
            </CardTitle>
          </CardHeader>
          <CardContent>
            <RegisterForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
