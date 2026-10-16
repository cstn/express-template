import { config as dotenv } from 'dotenv';
import { z } from 'zod';

dotenv({
  quiet: true,
});

export const EnvironmentSchema = z.object({
  PORT: z.number(),
});

export type Environment = z.infer<typeof EnvironmentSchema>;

export const config: Environment = {
  PORT: Number(process.env.PORT) || 3000,
};
