import { z } from 'zod';

export const addWorkoutSplitSchema = z.object({
  title: z.string().min(1).max(50),
  days: z.number().gte(1).lte(7),
});

export type addWorkoutSplitDto = z.infer<typeof addWorkoutSplitSchema>;
