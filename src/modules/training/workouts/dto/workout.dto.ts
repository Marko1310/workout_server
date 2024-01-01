import { z } from 'zod';

export const AddWorkoutSchema = z.object({
  title: z.string().min(1).max(50),
});
export type AddWorkoutDto = z.infer<typeof AddWorkoutSchema>;

//TODO: export exercise to exercise types
const ExerciseSchema = z.object({
  title: z.string().min(1),
  goalSets: z.number().min(1),
  goalReps: z.number().min(1),
});
const ExerciseArraySchema = z.array(ExerciseSchema);
export const AddNewWorkoutSchema = z.object({
  title: z.string().min(1),
  exercises: ExerciseArraySchema,
});
export type AddNewWorkoutDto = z.infer<typeof AddNewWorkoutSchema>;
