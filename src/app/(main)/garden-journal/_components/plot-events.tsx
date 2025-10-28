/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar, Edit3, Plus, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  createEvent,
  deleteEvent,
  getEvents,
  updateEvent,
} from '@/services/garden-events-service';
import type { GardenPlot } from '@/types/garden-journal';

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-unused-vars */

export interface GardenEvent {
  _id: string;
  plotId: string;
  title: string;
  type:
    | 'watering'
    | 'fertilizing'
    | 'pruning'
    | 'pest control'
    | 'harvest'
    | 'other';
  date: string | Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const EventSchema = z.object({
  title: z.string().min(1, 'Event title is required'),
  type: z.enum([
    'watering',
    'fertilizing',
    'pruning',
    'pest control',
    'harvest',
    'other',
  ]),
  date: z.string().min(1, 'Date is required'),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof EventSchema>;

interface PlotEventsProps {
  plot: GardenPlot;
}

export default function PlotEvents({ plot }: PlotEventsProps) {
  const { toast } = useToast();
  const [events, setEvents] = useState<GardenEvent[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<GardenEvent | null>(null);
  const [eventToDelete, setEventToDelete] = useState<GardenEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const form = useForm<FormData>({
    resolver: zodResolver(EventSchema),
    defaultValues: {
      title: '',
      type: 'watering',
      date: '',
      notes: '',
    },
  });

  const loadEvents = async () => {
    try {
      setIsLoading(true);
      const data = await getEvents(plot._id);

      setEvents(data);
    } catch (err) {
      console.error(err);
      toast({
        title: 'Error',
        description: 'Failed to load garden events.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEvents();
  }, [plot._id]);

  const handleAddEvent = async (data: FormData) => {
    try {
      await createEvent(plot._id, data);
      toast({
        title: 'Event added',
        description: 'Event recorded successfully.',
      });
      setIsAdding(false);
      form.reset();
      loadEvents();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to add event.',
        variant: 'destructive',
      });
    }
  };

  const handleEditClick = (event: GardenEvent) => {
    setSelectedEvent(event);
    form.reset({
      title: event.title,
      type: event.type,
      date: new Date(event.date).toISOString().split('T')[0],
      notes: event.notes || '',
    });
    setIsEditing(true);
  };

  const handleEditEvent = async (data: FormData) => {
    if (!selectedEvent) return;
    try {
      await updateEvent(plot._id, selectedEvent._id, data);
      toast({
        title: 'Event updated',
        description: 'Event updated successfully.',
      });
      setIsEditing(false);
      setSelectedEvent(null);
      form.reset();
      loadEvents();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to update event.',
        variant: 'destructive',
      });
    }
  };

  const handleDeleteClick = (event: GardenEvent) => {
    setEventToDelete(event);
    setIsDeleting(true);
  };

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;
    try {
      await deleteEvent(plot._id, eventToDelete._id);
      toast({
        title: 'Event deleted',
        description: `${eventToDelete.title} removed.`,
      });
      setIsDeleting(false);
      setEventToDelete(null);
      loadEvents();
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to delete event.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Garden Events</CardTitle>
              <CardDescription>
                Track important events in your garden plot
              </CardDescription>
            </div>
            <Button onClick={() => setIsAdding(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Events list */}
          {isLoading ? (
            <p className="text-center text-muted-foreground">
              Loading events...
            </p>
          ) : events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {events.map((event) => (
                <Card key={event._id}>
                  <CardHeader>
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription className="capitalize">
                      {event.type}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    {event.notes && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {event.notes}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEditClick(event)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDeleteClick(event)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="text-center text-muted-foreground">
                  No Events Yet
                </CardTitle>
                <CardDescription className="text-center">
                  Start logging your garden activities
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <Button onClick={() => setIsAdding(true)} variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Event
                </Button>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>

      {/* Add Event Dialog */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Garden Event</DialogTitle>
            <DialogDescription>
              Record an important event in your garden.
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddEvent)}
              className="space-y-4"
            >
              <EventFormFields form={form} />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAdding(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Event</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Edit Event Dialog */}
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update details for{' '}
              <span className="font-semibold">{selectedEvent?.title}</span>
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditEvent)}
              className="space-y-4"
            >
              <EventFormFields form={form} />
              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Event Dialog */}
      <Dialog open={isDeleting} onOpenChange={setIsDeleting}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-semibold">{eventToDelete?.title}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeleting(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmDelete}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// 🔹 Extracted form fields subcomponent to avoid repetition
function EventFormFields({
  form,
}: {
  form: ReturnType<typeof useForm<FormData>>;
}) {
  return (
    <>
      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="title">Title</label>
        <input
          {...form.register('title')}
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="type">Type</label>
        <Select
          onValueChange={(value) =>
            form.setValue('type', value as FormData['type'])
          }
          defaultValue={form.getValues('type')}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select event type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="watering">Watering</SelectItem>
            <SelectItem value="fertilizing">Fertilizing</SelectItem>
            <SelectItem value="pruning">Pruning</SelectItem>
            <SelectItem value="pest control">Pest Control</SelectItem>
            <SelectItem value="harvest">Harvest</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          {...form.register('date')}
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
        />
      </div>

      <div className="grid w-full items-center gap-1.5">
        <label htmlFor="notes">Notes (Optional)</label>
        <textarea
          {...form.register('notes')}
          className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
      </div>
    </>
  );
}
