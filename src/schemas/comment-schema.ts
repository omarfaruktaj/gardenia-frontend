import { z } from 'zod';

export const commentFormSchema = z.object({
  content: z
    .string()
    .min(1, { message: 'Content cannot be empty.' })
    .max(500, { message: 'Content must be no more than 500 characters.' }),
});
export type TCommentFormSchema = z.infer<typeof commentFormSchema>;
