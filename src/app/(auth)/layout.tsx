import Navbar from '@/components/layout/navbar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center bg-background">
        {children}
      </div>
    </div>
  );
}
