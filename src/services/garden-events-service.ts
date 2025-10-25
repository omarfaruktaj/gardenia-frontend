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

// ✅ LocalStorage key for events
const STORAGE_KEY = 'garden_events' as const;

// ----------------------------
// 🔧 Serialization Utilities
// ----------------------------

// Convert Date objects to serializable JSON
const serializeData = <T>(data: T): string => {
  return JSON.stringify(data, (_, value) => {
    if (value instanceof Date) {
      return { __type: 'Date', value: value.toISOString() };
    }
    return value;
  });
};

// Restore Date objects from serialized JSON
const deserializeData = <T>(data: string): T => {
  return JSON.parse(data, (_, value) => {
    if (value && typeof value === 'object' && value.__type === 'Date') {
      return new Date(value.value);
    }
    return value;
  });
};

// ----------------------------
// 🧠 LocalStorage Helpers
// ----------------------------

const getFromStorage = <T>(key: string): T[] => {
  if (typeof window === 'undefined') return [];
  const data = localStorage.getItem(key);
  return data ? deserializeData<T[]>(data) : [];
};

const saveToStorage = <T>(key: string, data: T[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(key, serializeData(data));
};

// ----------------------------
// 🌱 Garden Event Handlers
// ----------------------------

/**
 * Create a new event in a garden plot
 */
export const createEvent = async (
  plotId: string,
  eventData: Omit<GardenEvent, '_id' | 'plotId' | 'createdAt' | 'updatedAt'>
): Promise<GardenEvent> => {
  const events = getFromStorage<GardenEvent>(STORAGE_KEY);

  const newEvent: GardenEvent = {
    ...eventData,
    _id: Date.now().toString(),
    plotId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  events.push(newEvent);
  saveToStorage(STORAGE_KEY, events);

  return newEvent;
};

/**
 * Retrieve all events for a specific garden plot
 */
export const getEvents = async (plotId: string): Promise<GardenEvent[]> => {
  const events = getFromStorage<GardenEvent>(STORAGE_KEY);
  return events.filter((event) => event.plotId === plotId);
};

/**
 * Update an existing garden event
 */
export const updateEvent = async (
  plotId: string,
  eventId: string,
  eventData: Partial<GardenEvent>
): Promise<GardenEvent> => {
  const events = getFromStorage<GardenEvent>(STORAGE_KEY);
  const index = events.findIndex(
    (event) => event._id === eventId && event.plotId === plotId
  );

  if (index === -1) throw new Error('Event not found');

  events[index] = {
    ...events[index],
    ...eventData,
    updatedAt: new Date(),
  };

  saveToStorage(STORAGE_KEY, events);
  return events[index];
};

/**
 * Delete a specific garden event
 */
export const deleteEvent = async (
  plotId: string,
  eventId: string
): Promise<void> => {
  const events = getFromStorage<GardenEvent>(STORAGE_KEY);
  const filtered = events.filter(
    (event) => !(event._id === eventId && event.plotId === plotId)
  );

  saveToStorage(STORAGE_KEY, filtered);
};
