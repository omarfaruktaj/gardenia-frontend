'use client';

import { AlertCircle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

export default function AccountSettings() {
  // const [isLoading, setIsLoading] = useState(false);

  // function onSubmit(e: React.FormEvent) {
  //   e.preventDefault();
  //   setIsLoading(true);

  //   // Simulate API call
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account Information</h3>
        <p className="text-sm text-muted-foreground">
          View and update your account details.
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="account-id">Account ID</Label>
            <Input id="account-id" value="ACC-12345" readOnly disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="account-created">Account Created</Label>
            <Input id="account-created" value="Jan 1, 2023" readOnly disabled />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-lg font-medium">Connected Accounts</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Connect your accounts to enable single sign-on.
        </p>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                G
              </div>
              <div>
                <p className="font-medium">Google</p>
                <p className="text-sm text-muted-foreground">Connected</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Disconnect
            </Button>
          </div>

          <div className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                G
              </div>
              <div>
                <p className="font-medium">GitHub</p>
                <p className="text-sm text-muted-foreground">Not connected</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible and destructive actions for your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                Deleting your account is permanent. All your data will be wiped
                out immediately and you won&apos;t be able to get it back.
              </AlertDescription>
            </Alert>
          </CardContent>
          <CardFooter>
            <Button variant="destructive">Delete Account</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
