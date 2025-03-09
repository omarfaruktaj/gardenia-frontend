import { z } from 'zod';

export const userUpdateSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(50, { message: 'Name must be less than 50 characters.' }),
  username: z
    .string()
    .min(1, { message: 'Username is required.' })
    .max(30, { message: 'Username must be less than 30 characters.' }),
  bio: z
    .string()
    .max(300, { message: 'Bio must be less than 300 characters.' })
    .optional(),
  avatar: z.string().url({ message: 'Avatar must be a valid URL.' }).optional(),
  cover: z.string().url({ message: 'cover must be a valid URL.' }).optional(),
});

export type TUserUpdateSchema = z.infer<typeof userUpdateSchema>;
