import Profile from '@/app/(main)/[userId]/_components/profile';

export default function Default({ params }: { params: { userId: string } }) {
  return <Profile userId={params.userId} />;
}
