export interface GardenPlot {
  _id: string;
  name: string;
  description: string;
  type: 'indoor' | 'outdoor' | 'container';
  size?: string;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface PlantEntry {
  _id: string;
  plotId: string;
  plantName: string;
  variety?: string;
  plantedDate: Date;
  status:
    | 'planted'
    | 'sprouted'
    | 'growing'
    | 'flowering'
    | 'fruiting'
    | 'harvested';
  notes?: string;
  images?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface GardenEvent {
  _id: string;
  plotId: string;
  plantEntryId?: string;
  type:
    | 'watering'
    | 'fertilizing'
    | 'pruning'
    | 'harvest'
    | 'pest-control'
    | 'other';
  date: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GardenReminder {
  _id: string;
  plotId: string;
  plantEntryId?: string;
  title: string;
  description?: string;
  dueDate: Date;
  recurring?: 'daily' | 'weekly' | 'monthly';
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}
