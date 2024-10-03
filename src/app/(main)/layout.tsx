export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="container mx-auto bg-background">{children}</div>;
}
