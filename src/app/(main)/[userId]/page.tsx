import Profile from '@/app/(main)/[userId]/_components/profile';

export default function Page({ params }: { params: { userId: string } }) {
  return <Profile userId={params.userId} />;
}
