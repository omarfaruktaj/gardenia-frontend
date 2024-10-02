import { z } from 'zod';

export const signUpSchema = z.object({
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

export const loginSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address.' })
    .max(100, { message: 'Email must be less than 100 characters.' }),

  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long.' })
    .max(100, { message: 'Password must be less than 100 characters.' }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address.' })
    .max(100, { message: 'Email must be less than 100 characters.' }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' })
      .max(100, { message: 'Password must be less than 100 characters.' }),
    confirmPassword: z
      .string()
      .min(6, { message: 'Password must be at least 6 characters long.' })
      .max(100, { message: 'Password must be less than 100 characters.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    // eslint-disable-next-line quotes
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type TForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;
export type TLoginSchema = z.infer<typeof loginSchema>;
export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
