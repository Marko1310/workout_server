import { z } from 'zod';

export const AddWorkoutSchema = z.object({
  title: z.string().min(1).max(50),
});

export type AddWorkoutSplitDto = z.infer<typeof AddWorkoutSchema>;
