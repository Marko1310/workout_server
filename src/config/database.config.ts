import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const dbSchema = z.object({
  type: z.string(),
  host: z.string(),
  port: z.coerce.number().default(5432),
  username: z.string().min(1),
  password: z.string(),
  database: z.string().min(1),
});

export default registerAs('database', () => {
  const config = dbSchema.parse({
    type: process.env.DATABASE_TYPE,
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
  });
  return config;
});
