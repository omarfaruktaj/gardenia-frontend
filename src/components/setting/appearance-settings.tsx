'use client';

import type React from 'react';
import { useState } from 'react';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';

export default function AppearanceSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [fontSize, setFontSize] = useState([16]);
  const { setTheme, theme } = useTheme();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      toast.success('Preferences saved successfully!');
    }, 1000);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Theme</h3>
        <RadioGroup defaultValue={theme} className="grid grid-cols-3 gap-4">
          <div>
            <RadioGroupItem
              onClick={() => setTheme('light')}
              value="light"
              id="light"
              className="sr-only peer"
            />
            <Label
              htmlFor="light"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Sun className="mb-3 h-6 w-6" />
              Light
            </Label>
          </div>

          <div>
            <RadioGroupItem
              onClick={() => setTheme('dark')}
              value="dark"
              id="dark"
              className="sr-only peer"
            />
            <Label
              htmlFor="dark"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Moon className="mb-3 h-6 w-6" />
              Dark
            </Label>
          </div>

          <div>
            <RadioGroupItem
              onClick={() => setTheme('system')}
              value="system"
              id="system"
              className="sr-only peer"
            />
            <Label
              htmlFor="system"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <Monitor className="mb-3 h-6 w-6" />
              System
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium">Font Size</h3>
            <p className="text-sm text-muted-foreground">
              Adjust the font size of the application.
            </p>
          </div>
          <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm text-muted-foreground">
            {fontSize}px
          </span>
        </div>
        <Slider
          defaultValue={[16]}
          max={24}
          min={12}
          step={1}
          onValueChange={setFontSize}
        />
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Density</h3>
        <RadioGroup defaultValue="default">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="compact" id="compact" />
            <Label htmlFor="compact">Compact</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="default" id="default" />
            <Label htmlFor="default">Default</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="comfortable" id="comfortable" />
            <Label htmlFor="comfortable">Comfortable</Label>
          </div>
        </RadioGroup>
      </div>

      <Button type="submit" disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save preferences'}
      </Button>
    </form>
  );
}
