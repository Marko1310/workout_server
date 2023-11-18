import { z } from 'zod';

const DataSchema = z.object({
  weight: z.number(),
  reps: z.number(),
  week: z.number(),
});

const EachSessionSchema = z.object({
  exerciseId: z.number(),
  sets: z.array(DataSchema),
});

export const AddSessionsSchema = z.object({
  exercisesData: z.array(EachSessionSchema),
});

export type AddSessionsDto = z.infer<typeof AddSessionsSchema>;
