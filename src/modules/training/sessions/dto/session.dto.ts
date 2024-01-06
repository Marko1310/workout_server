import { z } from 'zod';

const SetSchema = z.object({
  previousWeight: z.number().optional(),
  previousReps: z.number().optional(),
  weight: z.number(),
  reps: z.number(),
  week: z.number().optional(),
});

export type SetDto = z.infer<typeof SetSchema>;

const EachSessionSchema = z.object({
  exerciseId: z.number(),
  exercise_name: z.string(),
  sets: z.array(SetSchema),
});

const SessionArraySchema = z.array(EachSessionSchema);
export type SessionArrayDto = z.infer<typeof SessionArraySchema>;

export const AddSessionsSchema = z.object({
  exercisesData: SessionArraySchema,
});

export type AddSessionsDto = z.infer<typeof AddSessionsSchema>;
