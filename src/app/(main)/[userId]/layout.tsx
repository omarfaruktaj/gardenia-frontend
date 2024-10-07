export default function ProfileLayout({
  children,
  profile,
}: {
  children: React.ReactNode;
  profile: React.ReactNode;
}) {
  return (
    <>
      <div className="lg:mx-auto max-w-4xl border-r-2 border-l-2 min-h-screen">
        {children} {profile}
      </div>
    </>
  );
}
