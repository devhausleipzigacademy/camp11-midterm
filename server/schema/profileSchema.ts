import { z } from 'zod';

export const profileSchema = z.object({
  firstName: z.string().min(3, 'Must be at least 3 characters'),
  lastName: z.string().min(5, 'Must be at least 5 characters'),
  email: z.string().email(),
});

export type ProfileSchema = z.infer<typeof profileSchema>;
