import Navbar from '@/components/layout/navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto bg-background">{children}</div>
    </div>
  );
}
