import { z } from 'zod';

export const PostFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title is required.' })
    .max(100, { message: 'Title must be less than 100 characters.' }),

  content: z
    .string()
    .min(20, { message: 'Content is required.' })
    .max(5000, { message: 'Content must be less than 5000 characters.' }),

  category: z.string().min(1, 'Category is required'),
  images: z
    .array(z.string().url({ message: 'Each image must be a valid URL.' }))
    .default([]),
  premium: z.boolean().default(false),
});

export type TPostFormSchema = z.infer<typeof PostFormSchema>;
