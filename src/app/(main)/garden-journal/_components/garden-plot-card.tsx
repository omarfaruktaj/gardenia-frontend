'use client';

import { CalendarDays, MapPin, Plus } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { GardenPlot } from '@/types/garden-journal';

interface GardenPlotCardProps {
  plot: GardenPlot;
}

export default function GardenPlotCard({ plot }: GardenPlotCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200" />
        {/* TODO: Add plot cover image */}
        <div className="absolute bottom-4 left-4">
          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
            {plot.type.charAt(0).toUpperCase() + plot.type.slice(1)}
          </span>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl font-semibold">{plot.name}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        {plot.location && (
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{plot.location}</span>
          </div>
        )}
        {plot.size && (
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="mr-2 h-4 w-4 flex items-center justify-center">
              ⬚
            </div>
            <span>{plot.size}</span>
          </div>
        )}
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          <span>Created {new Date(plot.createdAt).toLocaleDateString()}</span>
        </div>
        {plot.description && (
          <p className="text-sm text-muted-foreground mt-2">
            {plot.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="justify-between">
        <Button variant="outline" size="sm" asChild>
          <Link href={`/garden-journal/${plot._id}`}>View Details</Link>
        </Button>
        <Button variant="ghost" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Plant
        </Button>
      </CardFooter>
    </Card>
  );
}
