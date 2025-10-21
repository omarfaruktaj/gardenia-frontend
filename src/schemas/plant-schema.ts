import { z } from 'zod';

export const plantSchema = z.object({
  plantName: z.string().min(1, { message: 'Plant name is required' }),
  variety: z.string().optional(),
  status: z.enum(
    ['planted', 'sprouted', 'growing', 'flowering', 'fruiting', 'harvested'],
    {
      required_error: 'Please select a plant status',
    }
  ),
  notes: z
    .string()
    .max(500, { message: 'Notes must be less than 500 characters' })
    .optional(),
  images: z.array(z.string().url({ message: 'Invalid image URL' })).optional(),
});

export type PlantFormValues = z.infer<typeof plantSchema>;
