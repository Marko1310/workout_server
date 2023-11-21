import { z } from 'zod';

const SetSchema = z.object({
  weight: z.number(),
  reps: z.number(),
  week: z.number().optional(),
});

export type SetDto = z.infer<typeof SetSchema>;

const EachSessionSchema = z.object({
  exerciseId: z.number(),
  sets: z.array(SetSchema),
});

const SessionArraySchema = z.array(EachSessionSchema);
export type SessionArrayDto = z.infer<typeof SessionArraySchema>;

export const AddSessionsSchema = z.object({
  exercisesData: SessionArraySchema,
});

export type AddSessionsDto = z.infer<typeof AddSessionsSchema>;
