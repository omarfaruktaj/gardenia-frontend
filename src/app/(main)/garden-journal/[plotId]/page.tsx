'use client';

import { useEffect, useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Calendar,
  Edit3,
  FlowerIcon,
  Loader2,
  Plus,
  Trash2,
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
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
import { Heading } from '@/components/ui/heading';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import {
  createPlantEntry,
  deletePlantEntry,
  getPlantEntries,
  getPlot,
  updatePlantEntry,
} from '@/services/garden-journal-service';
import type { GardenPlot, PlantEntry } from '@/types/garden-journal';

import PlotEvents from '../_components/plot-events';

const PlantSchema = z.object({
  plantName: z.string().min(1, 'Plant name is required'),
  variety: z.string().optional(),
  status: z.enum([
    'planted',
    'sprouted',
    'growing',
    'flowering',
    'fruiting',
    'harvested',
  ]),
  notes: z.string().optional(),
});

export default function PlotDetails() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [plot, setPlot] = useState<GardenPlot | null>(null);
  const [plants, setPlants] = useState<PlantEntry[]>([]);
  const [isAddingPlant, setIsAddingPlant] = useState(false);
  const [isEditingPlant, setIsEditingPlant] = useState(false);
  const [selectedPlant, setSelectedPlant] = useState<PlantEntry | null>(null);
  const [isDeletingPlant, setIsDeletingPlant] = useState(false);
  const [plantToDelete, setPlantToDelete] = useState<PlantEntry | null>(null);

  type FormData = z.infer<typeof PlantSchema>;

  const form = useForm<FormData>({
    resolver: zodResolver(PlantSchema),
    defaultValues: {
      plantName: '',
      variety: '',
      status: 'planted',
      notes: '',
    },
  });
  const loadPlotData = async () => {
    if (!params.plotId) {
      toast({
        title: 'Error',
        description: 'Invalid plot ID',
        variant: 'destructive',
      });
      router.push('/garden-journal');
      return;
    }

    try {
      setIsLoading(true);
      const plotData = await getPlot(params.plotId as string);
      const plantsData = await getPlantEntries(params.plotId as string);
      setPlot(plotData);
      setPlants(plantsData);
    } catch (err) {
      console.error('Failed to load plot data:', err);
      toast({
        title: 'Error',
        description: 'Failed to load garden plot data',
        variant: 'destructive',
      });
      router.push('/garden-journal');
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    loadPlotData();
  }, []);

  const handleAddPlant = async (data: z.infer<typeof PlantSchema>) => {
    try {
      if (!plot) return;

      await createPlantEntry(plot._id, {
        ...data,
        plantedDate: new Date(),
      });
      toast({
        title: 'Success',
        description: 'Plant added successfully',
      });
      setIsAddingPlant(false);
      loadPlotData(); // Refresh plants list
      form.reset();
    } catch (err) {
      console.error('Failed to add plant:', err);
      toast({
        title: 'Error',
        description: 'Failed to add plant',
        variant: 'destructive',
      });
    }
  };
  const handleEditClick = (plant: PlantEntry) => {
    setSelectedPlant(plant);
    form.reset({
      plantName: plant.plantName,
      variety: plant.variety || '',
      status: plant.status,
      notes: plant.notes || '',
    });
    setIsEditingPlant(true);
  };
  const handleDeleteClick = (plant: PlantEntry) => {
    setPlantToDelete(plant);
    setIsDeletingPlant(true);
  };

  const handleConfirmDelete = async () => {
    if (!plantToDelete || !plot) return;

    try {
      await deletePlantEntry(plot._id, plantToDelete._id);
      toast({
        title: 'Plant deleted',
        description: `${plantToDelete.plantName} has been removed from your garden.`,
      });
      setIsDeletingPlant(false);
      setPlantToDelete(null);
      loadPlotData();
    } catch (err) {
      console.error('Failed to delete plant:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete plant.',
        variant: 'destructive',
      });
    }
  };

  const handleEditPlant = async (data: z.infer<typeof PlantSchema>) => {
    try {
      if (!selectedPlant || !plot) return;

      await updatePlantEntry(plot._id, selectedPlant._id, data);

      toast({
        title: 'Success',
        description: 'Plant updated successfully',
      });

      setIsEditingPlant(false);
      setSelectedPlant(null);
      loadPlotData();
    } catch (err) {
      console.error('Failed to update plant:', err);
      toast({
        title: 'Error',
        description: 'Failed to update plant',
        variant: 'destructive',
      });
    }
  };

  if (isLoading || !plot) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 bg-background p-4 lg:p-6 z-50">
        <div className="flex items-center justify-between">
          <Heading
            back
            title={plot.name}
            description={`${plot.type.charAt(0).toUpperCase() + plot.type.slice(1)} garden`}
            isLanding
          />
        </div>
        <Separator className="my-4" />
      </div>
      <div className="p-4 lg:p-6">
        <Tabs defaultValue="plants" className="space-y-4">
          <TabsList>
            <TabsTrigger value="plants">Plants</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
          </TabsList>

          <TabsContent value="plants" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => setIsAddingPlant(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Plant
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {plants.map((plant) => (
                <Card key={plant._id}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FlowerIcon className="h-5 w-5 text-primary" />
                      {plant.plantName}
                    </CardTitle>
                    {plant.variety && (
                      <CardDescription>{plant.variety}</CardDescription>
                    )}
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      Planted:{' '}
                      {new Date(plant.plantedDate).toLocaleDateString()}
                    </div>
                    <div className="mt-2">
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        {plant.status.charAt(0).toUpperCase() +
                          plant.status.slice(1)}
                      </span>
                    </div>
                    {plant.notes && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {plant.notes}
                      </p>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleEditClick(plant)}
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDeleteClick(plant)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}

              {plants.length === 0 && (
                <Card className="col-span-full">
                  <CardHeader>
                    <CardTitle className="text-center text-muted-foreground">
                      No Plants Yet
                    </CardTitle>
                    <CardDescription className="text-center">
                      Start tracking your plants by adding your first one
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-center">
                    <Button
                      onClick={() => setIsAddingPlant(true)}
                      variant="outline"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Your First Plant
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="events">
            <Card>
              <CardHeader>
                <CardTitle>Garden Events</CardTitle>
                <CardDescription>
                  Track important events in your garden plot
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PlotEvents plot={plot} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reminders">
            <Card>
              <CardHeader>
                <CardTitle>Care Reminders</CardTitle>
                <CardDescription>
                  Set and manage reminders for your garden tasks
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* TODO: Implement reminders list */}
                <p className="text-center text-muted-foreground">
                  Reminders feature coming soon
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      {/* Add Plant Dialog */}
      <Dialog open={isAddingPlant} onOpenChange={setIsAddingPlant}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Plant</DialogTitle>
            <DialogDescription>
              Add a new plant to track in your garden plot
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddPlant)}
              className="space-y-4"
            >
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <label htmlFor="plantName">Plant Name</label>
                  <input
                    {...form.register('plantName')}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <label htmlFor="variety">Variety (Optional)</label>
                  <input
                    {...form.register('variety')}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <label htmlFor="status">Current Status</label>
                  <Select
                    onValueChange={(value: string) =>
                      form.setValue(
                        'status',
                        value as
                          | 'planted'
                          | 'sprouted'
                          | 'growing'
                          | 'flowering'
                          | 'fruiting'
                          | 'harvested'
                      )
                    }
                    defaultValue={form.getValues('status')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planted">Planted</SelectItem>
                      <SelectItem value="sprouted">Sprouted</SelectItem>
                      <SelectItem value="growing">Growing</SelectItem>
                      <SelectItem value="flowering">Flowering</SelectItem>
                      <SelectItem value="fruiting">Fruiting</SelectItem>
                      <SelectItem value="harvested">Harvested</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <label htmlFor="notes">Notes (Optional)</label>
                  <textarea
                    {...form.register('notes')}
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsAddingPlant(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Add Plant</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* Edit Plant Dialog */}
      <Dialog open={isEditingPlant} onOpenChange={setIsEditingPlant}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Plant</DialogTitle>
            <DialogDescription>
              Update details for{' '}
              <span className="font-semibold">{selectedPlant?.plantName}</span>
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleEditPlant)}
              className="space-y-4"
            >
              <div className="space-y-4">
                <div className="grid w-full items-center gap-1.5">
                  <label htmlFor="plantName">Plant Name</label>
                  <input
                    {...form.register('plantName')}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <label htmlFor="variety">Variety (Optional)</label>
                  <input
                    {...form.register('variety')}
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm"
                  />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <label htmlFor="status">Current Status</label>
                  <Select
                    onValueChange={(value: string) =>
                      form.setValue(
                        'status',
                        value as
                          | 'planted'
                          | 'sprouted'
                          | 'growing'
                          | 'flowering'
                          | 'fruiting'
                          | 'harvested'
                      )
                    }
                    defaultValue={form.getValues('status')}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planted">Planted</SelectItem>
                      <SelectItem value="sprouted">Sprouted</SelectItem>
                      <SelectItem value="growing">Growing</SelectItem>
                      <SelectItem value="flowering">Flowering</SelectItem>
                      <SelectItem value="fruiting">Fruiting</SelectItem>
                      <SelectItem value="harvested">Harvested</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <label htmlFor="notes">Notes (Optional)</label>
                  <textarea
                    {...form.register('notes')}
                    className="flex min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditingPlant(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeletingPlant} onOpenChange={setIsDeletingPlant}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Plant</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-semibold">{plantToDelete?.plantName}</span>?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDeletingPlant(false)}
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
      ;
    </div>
  );
}
