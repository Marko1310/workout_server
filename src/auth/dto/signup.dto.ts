import { z } from 'zod';

export const SignupDtoSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignupDto = z.infer<typeof SignupDtoSchema>;
