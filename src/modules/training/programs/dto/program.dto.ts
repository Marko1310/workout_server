import { z } from 'zod';

export const AddProgramSchema = z.object({
  title: z.string().min(1).max(50),
  days: z.number().gte(1).lte(7),
});

export type AddProgramDto = z.infer<typeof AddProgramSchema>;
