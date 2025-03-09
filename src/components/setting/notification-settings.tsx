'use client';

import type React from 'react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';

export default function NotificationSettings() {
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Email Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-marketing">Marketing emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about new products, features, and more.
              </p>
            </div>
            <Switch id="email-marketing" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-social">Social notifications</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails for friend requests, follows, and more.
              </p>
            </div>
            <Switch id="email-social" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="email-security">Security emails</Label>
              <p className="text-sm text-muted-foreground">
                Receive emails about your account activity and security.
              </p>
            </div>
            <Switch id="email-security" defaultChecked />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Push Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-everything">Everything</Label>
              <p className="text-sm text-muted-foreground">
                Get notified for all activity.
              </p>
            </div>
            <Switch id="push-everything" />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-mentions">Mentions</Label>
              <p className="text-sm text-muted-foreground">
                Get notified when you&apos;re mentioned.
              </p>
            </div>
            <Switch id="push-mentions" defaultChecked />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="push-messages">Direct messages</Label>
              <p className="text-sm text-muted-foreground">
                Get notified for new messages.
              </p>
            </div>
            <Switch id="push-messages" defaultChecked />
          </div>
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Notification Frequency</h3>
        <RadioGroup defaultValue="immediately">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="immediately" id="immediately" />
            <Label htmlFor="immediately">Immediately</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="daily" id="daily" />
            <Label htmlFor="daily">Daily digest</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="weekly" id="weekly" />
            <Label htmlFor="weekly">Weekly digest</Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save preferences'}
      </Button>
    </form>
  );
}
