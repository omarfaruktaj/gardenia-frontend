export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log('AuthLayout rendered');
  return <div>{children}</div>;
}
