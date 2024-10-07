import Profile from '@/components/profile/profile';

export default function Page({ params }: { params: { userId: string } }) {
  return <Profile userId={params.userId} />;
}
