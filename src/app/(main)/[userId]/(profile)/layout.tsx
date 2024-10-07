export default function ProfileLayout({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: React.ReactNode;
}) {
  return (
    <>
      <div className="lg:mx-auto max-w-4xl border-x min-h-screen">
        {children} {profile}
      </div>
    </>
  );
}
