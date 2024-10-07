import Profile from '@/components/profile/profile';

export default function Default({ params }: { params: { userId: string } }) {
  return <Profile userId={params.userId} />;
}
