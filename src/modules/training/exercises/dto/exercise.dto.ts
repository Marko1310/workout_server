import { z } from 'zod';

export const AddExerciseSchema = z.object({
  title: z.string().min(1).max(50),
  goalSets: z.number(),
  goalReps: z.number(),
});

export type AddExerciseDto = z.infer<typeof AddExerciseSchema>;
