import ChangePasswordForm from '@/app/(dashboard)/_components/change-password-form';
import BackButton from '@/components/ui/back-button';
import { Heading } from '@/components/ui/heading';

export default function ChangePassword() {
  return (
    <div className="p-6 max-w-xl mx-auto">
      <BackButton />
      <Heading
        title="Change Your Password"
        description="Ensure your password is strong and unique to keep your account secure."
      />
      <div className="mt-6 ">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
