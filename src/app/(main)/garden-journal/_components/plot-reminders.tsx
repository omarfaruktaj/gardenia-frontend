'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Calendar,
  CheckCircle2,
  Edit3,
  Loader2,
  Plus,
  Trash2,
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  createReminder,
  deleteReminder,
  getReminders,
  updateReminder,
} from '@/services/garden-journal-service';
import type { GardenPlot, GardenReminder } from '@/types/garden-journal';

const ReminderSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  dueDate: z.string().min(1, 'Due date is required'),
  recurring: z.enum(['daily', 'weekly', 'monthly']).optional(),
});

type FormData = z.infer<typeof ReminderSchema>;

interface PlotRemindersProps {
  plot: GardenPlot;
}

export default function PlotReminders({ plot }: PlotRemindersProps) {
  const { toast } = useToast();

  const [reminders, setReminders] = useState<GardenReminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [selectedReminder, setSelectedReminder] =
    useState<GardenReminder | null>(null);
  const [reminderToDelete, setReminderToDelete] =
    useState<GardenReminder | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(ReminderSchema),
    defaultValues: {
      title: '',
      description: '',
      dueDate: '',
      recurring: undefined,
    },
  });

  const loadReminders = async () => {
    try {
      setIsLoading(true);
      const data = await getReminders(plot._id);
      setReminders(data);
    } catch (err) {
      console.error('Failed to load reminders:', err);
      toast({
        title: 'Error',
        description: 'Failed to load reminders.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  const handleAddReminder = async (data: FormData) => {
    try {
      await createReminder(plot._id, {
        ...data,
        dueDate: new Date(data.dueDate),
        completed: false,
      });
      toast({ title: 'Success', description: 'Reminder added successfully.' });
      setIsAdding(false);
      form.reset();
      loadReminders();
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Failed to add reminder.',
        variant: 'destructive',
      });
    }
  };

  const handleEditReminder = async (data: FormData) => {
    if (!selectedReminder) return;
    try {
      await updateReminder(plot._id, selectedReminder._id, {
        ...data,
        dueDate: new Date(data.dueDate),
      });
      toast({
        title: 'Updated',
        description: 'Reminder updated successfully.',
      });
      setIsEditing(false);
      setSelectedReminder(null);
      loadReminders();
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Failed to update reminder.',
        variant: 'destructive',
      });
    }
  };

  const handleConfirmDelete = async () => {
    if (!reminderToDelete) return;
    try {
      await deleteReminder(plot._id, reminderToDelete._id);
      toast({
        title: 'Deleted',
        description: `${reminderToDelete.title} has been removed.`,
      });
      setIsDeleting(false);
      loadReminders();
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Failed to delete reminder.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Care Reminders</CardTitle>
              <CardDescription>
                Manage your plot’s care schedule
              </CardDescription>
            </div>
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Reminder
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {reminders.length === 0 ? (
            <p className="text-center text-muted-foreground py-6">
              No reminders yet — add your first one!
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {reminders.map((reminder) => (
                <Card key={reminder._id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="truncate">
                        {reminder.title}
                      </CardTitle>
                      {reminder.completed && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                    </div>
                    <CardDescription className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(reminder.dueDate).toLocaleDateString()}
                      {reminder.recurring && (
                        <span className="ml-1 capitalize text-xs">
                          ({reminder.recurring})
                        </span>
                      )}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {reminder.description && (
                      <p className="text-sm text-muted-foreground">
                        {reminder.description}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => {
                        setSelectedReminder(reminder);
                        form.reset({
                          title: reminder.title,
                          description: reminder.description || '',
                          dueDate: new Date(reminder.dueDate)
                            .toISOString()
                            .split('T')[0],
                          recurring: reminder.recurring,
                        });
                        setIsEditing(true);
                      }}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => {
                        setReminderToDelete(reminder);
                        setIsDeleting(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Reminder Dialog */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Reminder</DialogTitle>
            <DialogDescription>
              Set a reminder for watering, fertilizing, or other garden tasks.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddReminder)}
              className="space-y-4"
            >
              <div className="space-y-3">
                <label>Title</label>
                <Input {...form.register('title')} className="Input" />

                <label>Description (Optional)</label>
                <Textarea {...form.register('description')} className="Input" />

                <label>Due Date</label>
                <Input
                  type="date"
                  {...form.register('dueDate')}
                  className="Input"
                />

                <label>Recurring (Optional)</label>
                <Select
                  onValueChange={(v) =>
                    form.setValue(
                      'recurring',
                      v as 'daily' | 'weekly' | 'monthly'
                    )
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAdding(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Reminder Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Reminder</DialogTitle>
            <DialogDescription>
              Update the details for{' '}
              <span className="font-semibold">{selectedReminder?.title}</span>.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditReminder)}
              className="space-y-4"
            >
              <div className="space-y-3">
                <label>Title</label>
                <Input {...form.register('title')} className="Input" />

                <label>Description (Optional)</label>
                <textarea {...form.register('description')} className="Input" />

                <label>Due Date</label>
                <Input
                  type="date"
                  {...form.register('dueDate')}
                  className="Input"
                />

                <label>Recurring (Optional)</label>
                <Select
                  onValueChange={(v) =>
                    form.setValue(
                      'recurring',
                      v as 'daily' | 'weekly' | 'monthly'
                    )
                  }
                  defaultValue={form.getValues('recurring')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Reminder</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-semibold">{reminderToDelete?.title}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleting(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
