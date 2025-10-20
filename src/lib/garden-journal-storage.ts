import type {
  GardenEvent,
  GardenPlot,
  GardenReminder,
  PlantEntry,
} from '@/types/garden-journal';

const STORAGE_KEYS = {
  PLOTS: 'garden_plots',
  PLANTS: 'garden_plants',
  EVENTS: 'garden_events',
  REMINDERS: 'garden_reminders',
} as const;

// Helper to serialize dates before storage
const serializeData = <T>(data: T): string => {
  return JSON.stringify(data, (_, value) => {
    if (value instanceof Date) {
      return { __type: 'Date', value: value.toISOString() };
    }
    return value;
  });
};

// Helper to deserialize dates after retrieval
const deserializeData = <T>(data: string): T => {
  return JSON.parse(data, (_, value) => {
    if (value && typeof value === 'object' && value.__type === 'Date') {
      return new Date(value.value);
    }
    return value;
  });
};

// Helper to get data from localStorage
const getFromStorage = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(key);
  return data ? deserializeData<T[]>(data) : [];
};

// Helper to save data to localStorage
const saveToStorage = <T>(key: string, data: T[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, serializeData(data));
};

// Garden Plot Functions
export const createPlot = async (
  plotData: Omit<GardenPlot, '_id' | 'createdAt' | 'updatedAt'>
): Promise<GardenPlot> => {
  const plots = getFromStorage<GardenPlot>(STORAGE_KEYS.PLOTS);
  const newPlot: GardenPlot = {
    ...plotData,
    _id: Date.now().toString(),
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  console.log(newPlot);
  plots.push(newPlot);
  saveToStorage(STORAGE_KEYS.PLOTS, plots);
  return newPlot;
};

export const getPlots = async (): Promise<GardenPlot[]> => {
  return getFromStorage<GardenPlot>(STORAGE_KEYS.PLOTS);
};

export const getPlot = async (plotId: string): Promise<GardenPlot | null> => {
  const plots = getFromStorage<GardenPlot>(STORAGE_KEYS.PLOTS);
  return plots.find((plot) => plot._id === plotId) || null;
};

export const updatePlot = async (
  plotId: string,
  plotData: Partial<GardenPlot>
): Promise<GardenPlot> => {
  const plots = getFromStorage<GardenPlot>(STORAGE_KEYS.PLOTS);
  const index = plots.findIndex((plot) => plot._id === plotId);
  if (index === -1) throw new Error('Plot not found');

  plots[index] = {
    ...plots[index],
    ...plotData,
    updatedAt: new Date(),
  };
  saveToStorage(STORAGE_KEYS.PLOTS, plots);
  return plots[index];
};

export const deletePlot = async (plotId: string): Promise<void> => {
  const plots = getFromStorage<GardenPlot>(STORAGE_KEYS.PLOTS);
  const filteredPlots = plots.filter((plot) => plot._id !== plotId);
  saveToStorage(STORAGE_KEYS.PLOTS, filteredPlots);

  // Also delete related plants, events, and reminders
  const plants = getFromStorage<PlantEntry>(STORAGE_KEYS.PLANTS);
  const filteredPlants = plants.filter((plant) => plant.plotId !== plotId);
  saveToStorage(STORAGE_KEYS.PLANTS, filteredPlants);

  const events = getFromStorage<GardenEvent>(STORAGE_KEYS.EVENTS);
  const filteredEvents = events.filter((event) => event.plotId !== plotId);
  saveToStorage(STORAGE_KEYS.EVENTS, filteredEvents);

  const reminders = getFromStorage<GardenReminder>(STORAGE_KEYS.REMINDERS);
  const filteredReminders = reminders.filter(
    (reminder) => reminder.plotId !== plotId
  );
  saveToStorage(STORAGE_KEYS.REMINDERS, filteredReminders);
};

// Plant Entry Functions
export const createPlantEntry = async (
  plotId: string,
  entryData: Omit<PlantEntry, '_id' | 'plotId' | 'createdAt' | 'updatedAt'>
): Promise<PlantEntry> => {
  const plants = getFromStorage<PlantEntry>(STORAGE_KEYS.PLANTS);
  const newPlant: PlantEntry = {
    ...entryData,
    _id: Date.now().toString(),
    plotId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  plants.push(newPlant);
  saveToStorage(STORAGE_KEYS.PLANTS, plants);
  return newPlant;
};

export const getPlantEntries = async (
  plotId: string
): Promise<PlantEntry[]> => {
  const plants = getFromStorage<PlantEntry>(STORAGE_KEYS.PLANTS);
  return plants.filter((plant) => plant.plotId === plotId);
};

export const updatePlantEntry = async (
  plotId: string,
  entryId: string,
  entryData: Partial<PlantEntry>
): Promise<PlantEntry> => {
  const plants = getFromStorage<PlantEntry>(STORAGE_KEYS.PLANTS);
  const index = plants.findIndex(
    (plant) => plant._id === entryId && plant.plotId === plotId
  );
  if (index === -1) throw new Error('Plant not found');

  plants[index] = {
    ...plants[index],
    ...entryData,
    updatedAt: new Date(),
  };
  saveToStorage(STORAGE_KEYS.PLANTS, plants);
  return plants[index];
};

export const deletePlantEntry = async (
  plotId: string,
  entryId: string
): Promise<void> => {
  const plants = getFromStorage<PlantEntry>(STORAGE_KEYS.PLANTS);
  const filteredPlants = plants.filter(
    (plant) => !(plant._id === entryId && plant.plotId === plotId)
  );
  saveToStorage(STORAGE_KEYS.PLANTS, filteredPlants);
};

// Garden Event Functions
export const createEvent = async (
  plotId: string,
  eventData: Omit<GardenEvent, '_id' | 'plotId' | 'createdAt' | 'updatedAt'>
): Promise<GardenEvent> => {
  const events = getFromStorage<GardenEvent>(STORAGE_KEYS.EVENTS);
  const newEvent: GardenEvent = {
    ...eventData,
    _id: Date.now().toString(),
    plotId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  events.push(newEvent);
  saveToStorage(STORAGE_KEYS.EVENTS, events);
  return newEvent;
};

export const getEvents = async (plotId: string): Promise<GardenEvent[]> => {
  const events = getFromStorage<GardenEvent>(STORAGE_KEYS.EVENTS);
  return events.filter((event) => event.plotId === plotId);
};

export const updateEvent = async (
  plotId: string,
  eventId: string,
  eventData: Partial<GardenEvent>
): Promise<GardenEvent> => {
  const events = getFromStorage<GardenEvent>(STORAGE_KEYS.EVENTS);
  const index = events.findIndex(
    (event) => event._id === eventId && event.plotId === plotId
  );
  if (index === -1) throw new Error('Event not found');

  events[index] = {
    ...events[index],
    ...eventData,
    updatedAt: new Date(),
  };
  saveToStorage(STORAGE_KEYS.EVENTS, events);
  return events[index];
};

export const deleteEvent = async (
  plotId: string,
  eventId: string
): Promise<void> => {
  const events = getFromStorage<GardenEvent>(STORAGE_KEYS.EVENTS);
  const filteredEvents = events.filter(
    (event) => !(event._id === eventId && event.plotId === plotId)
  );
  saveToStorage(STORAGE_KEYS.EVENTS, filteredEvents);
};

// Garden Reminder Functions
export const createReminder = async (
  plotId: string,
  reminderData: Omit<
    GardenReminder,
    '_id' | 'plotId' | 'createdAt' | 'updatedAt'
  >
): Promise<GardenReminder> => {
  const reminders = getFromStorage<GardenReminder>(STORAGE_KEYS.REMINDERS);
  const newReminder: GardenReminder = {
    ...reminderData,
    _id: Date.now().toString(),
    plotId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  reminders.push(newReminder);
  saveToStorage(STORAGE_KEYS.REMINDERS, reminders);
  return newReminder;
};

export const getReminders = async (
  plotId: string
): Promise<GardenReminder[]> => {
  const reminders = getFromStorage<GardenReminder>(STORAGE_KEYS.REMINDERS);
  return reminders.filter((reminder) => reminder.plotId === plotId);
};

export const updateReminder = async (
  plotId: string,
  reminderId: string,
  reminderData: Partial<GardenReminder>
): Promise<GardenReminder> => {
  const reminders = getFromStorage<GardenReminder>(STORAGE_KEYS.REMINDERS);
  const index = reminders.findIndex(
    (reminder) => reminder._id === reminderId && reminder.plotId === plotId
  );
  if (index === -1) throw new Error('Reminder not found');

  reminders[index] = {
    ...reminders[index],
    ...reminderData,
    updatedAt: new Date(),
  };
  saveToStorage(STORAGE_KEYS.REMINDERS, reminders);
  return reminders[index];
};

export const deleteReminder = async (
  plotId: string,
  reminderId: string
): Promise<void> => {
  const reminders = getFromStorage<GardenReminder>(STORAGE_KEYS.REMINDERS);
  const filteredReminders = reminders.filter(
    (reminder) => !(reminder._id === reminderId && reminder.plotId === plotId)
  );
  saveToStorage(STORAGE_KEYS.REMINDERS, filteredReminders);
};
