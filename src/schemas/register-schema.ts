import { z } from 'zod';

export const registerSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'Name is required.' })
    .max(50, { message: 'Name must be less than 50 characters.' }),

  email: z
    .string()
    .email({ message: 'Invalid email address.' })
    .max(100, { message: 'Email must be less than 100 characters.' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(100, { message: 'Password must be less than 100 characters.' }),
});

export type TRegisterSchema = z.infer<typeof registerSchema>;
