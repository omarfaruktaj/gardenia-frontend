import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import RegisterForm from '../_components/register-form';

export default function Register() {
  return (
    <Card className="mx-auto w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl">Create Your Gardenia Account</CardTitle>
        <CardDescription>
          Join our vibrant community of gardening enthusiasts! Fill out the form
          below to register and start sharing your gardening tips, accessing
          exclusive content, and connecting with fellow gardeners.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
      </CardContent>
    </Card>
  );
}
