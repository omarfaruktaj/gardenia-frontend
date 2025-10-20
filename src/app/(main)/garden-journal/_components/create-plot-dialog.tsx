'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { MapPin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import type { GardenPlot } from '@/types/garden-journal';

const plotFormSchema = z.object({
  name: z.string().min(1, 'Plot name is required').max(50),
  description: z.string().max(500).default(''),
  type: z.enum(['indoor', 'outdoor', 'container']),
  size: z.string().max(50).default(''),
  location: z.string().max(100).default(''),
});

type PlotFormValues = z.infer<typeof plotFormSchema>;

interface CreatePlotDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    data: Omit<GardenPlot, '_id' | 'userId' | 'createdAt' | 'updatedAt'>
  ) => void;
}

export default function CreatePlotDialog({
  open,
  onClose,
  onSubmit,
}: CreatePlotDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<PlotFormValues>({
    resolver: zodResolver(plotFormSchema),
    defaultValues: {
      name: '',
      description: '',
      type: 'outdoor',
      size: '',
      location: '',
    },
  });

  const handleSubmit = async (values: PlotFormValues) => {
    setIsSubmitting(true);
    try {
      onSubmit(values);
      form.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Garden Plot</DialogTitle>
          <DialogDescription>
            Add details about your garden plot to start tracking your plants and
            activities.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Plot Name</FormLabel>
                  <FormControl>
                    <Input placeholder="My Vegetable Garden" {...field} />
                  </FormControl>
                  <FormDescription>
                    Give your garden plot a memorable name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select plot type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="outdoor">Outdoor Garden</SelectItem>
                      <SelectItem value="indoor">Indoor Garden</SelectItem>
                      <SelectItem value="container">
                        Container Garden
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Choose the type of garden you are creating
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="10x10 ft" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the approximate size of your garden plot
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <div className="flex items-center space-x-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Backyard - South Side" {...field} />
                    </div>
                  </FormControl>
                  <FormDescription>
                    Specify where this plot is located
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add any notes about your garden plot..."
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Additional details about your garden plot
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                Create Plot
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
