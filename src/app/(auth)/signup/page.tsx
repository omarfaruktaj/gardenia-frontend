import BackButton from '@/components/ui/back-button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import RegisterForm from '../_components/sign-up-form';

export default function SignUp() {
  return (
    <div>
      <BackButton />
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 overflow-hidden rounded-lg bg-background p-4 shadow-lg md:flex-row">
        <div className="flex w-full max-w-md flex-col justify-center">
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
