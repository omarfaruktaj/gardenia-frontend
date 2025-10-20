'use client';

import { useEffect, useState } from 'react';

import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/context/user-provider';
import { useToast } from '@/hooks/use-toast';
import { createPlot, getPlots } from '@/services/garden-journal-service';
import { GardenPlot } from '@/types/garden-journal';

import CreatePlotDialog from './_components/create-plot-dialog';
import GardenPlotCard from './_components/garden-plot-card';

export default function GardenJournal() {
  const { toast } = useToast();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [plots, setPlots] = useState<GardenPlot[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    const loadPlots = async () => {
      try {
        const allPlots = await getPlots();
        console.log(allPlots);
        const userPlots = allPlots.filter((plot) => plot.userId === user?._id);
        setPlots(userPlots);
      } catch {
        toast({
          title: 'Error',
          description: 'Could not load garden plots. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadPlots();
  }, [toast, user?._id]);

  const handleCreatePlot = async (
    plot: Omit<GardenPlot, '_id' | 'userId' | 'createdAt' | 'updatedAt'>
  ) => {
    try {
      if (!user?._id) {
        throw new Error('User not authenticated');
      }

      const newPlot = await createPlot({
        ...plot,
        userId: user?._id,
      });

      setPlots((currentPlots) => [...currentPlots, newPlot]);

      toast({
        title: 'Garden plot created',
        description: 'Your new garden plot has been created successfully.',
      });
      setIsCreateDialogOpen(false);
    } catch {
      toast({
        title: 'Error',
        description: 'Could not create garden plot. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 bg-background p-4 lg:p-6 z-50">
        <div className="flex items-center justify-between">
          <Heading
            title="Garden Journal"
            description="Track and manage your garden plots, plants, and activities"
            isLanding
          />
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Plot
          </Button>
        </div>
        <Separator className="my-4" />
      </div>

      <div className="p-4 lg:p-6">
        {isLoading ? (
          <div className="flex justify-center">
            <svg
              className="animate-spin h-8 w-8 text-green-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
          </div>
        ) : plots.length === 0 ? (
          <Card>
            <CardHeader>
              <CardTitle className="text-center text-muted-foreground">
                No Garden Plots Yet
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Start tracking your garden by creating your first plot
              </p>
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                variant="outline"
                className="mx-auto"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Plot
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plots.map((plot) => (
              <GardenPlotCard key={plot._id} plot={plot} />
            ))}
          </div>
        )}
      </div>

      <CreatePlotDialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSubmit={handleCreatePlot}
      />
    </div>
  );
}
