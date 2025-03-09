import ChangePasswordForm from '@/app/(dashboard)/_components/change-password-form';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';

export default function Settings() {
  return (
    <div className="p-6 ">
      <Heading title="Settings" description="Manage your account preferences" />
      <Separator className="mt-2" />
      <div className="mt-6 max-w-xl">
        <h3 className="text-xl font-semibold">Change Your Password</h3>
        <p className="my-2 text-muted-foreground">
          Ensure your password is strong and unique to keep your account secure.
        </p>
        <ChangePasswordForm />
      </div>
    </div>
  );
}
