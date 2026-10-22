import { config as dotenv } from 'dotenv';
import { z } from 'zod';

dotenv({
  quiet: true,
});

export const EnvironmentSchema = z.object({
  ENV: z.enum(['development', 'production', 'staging', 'test']),
  PORT: z.number(),
  DOCS: z.boolean(),
  ALLOWED_ORIGINS: z.array(z.string()).optional(),
  JWKS_URL: z.url(),
  JWT_ISSUER: z.string(),
  JWT_AUDIENCE: z.string(),
  DATABASE_URL: z.url(),
  REDIS_URL: z.string(),
  MONGO_URL: z.url(),
});

export type Environment = z.infer<typeof EnvironmentSchema>;

export const config: Environment = {
  ENV: process.env.NODE_ENV as
    'development' | 'production' | 'staging' | 'test',
  PORT: Number(process.env.PORT) || 3000,
  DOCS: process.env.ENABLE_DOCS === 'true',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(','),
  JWKS_URL: process.env.JWKS_URL as string,
  JWT_ISSUER: process.env.JWT_ISSUER as string,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE as string,
  DATABASE_URL: process.env.DATABASE_URL as string,
  REDIS_URL: process.env.REDIS_URL as string,
  MONGO_URL: process.env.MONGO_URL as string,
};

const validated = EnvironmentSchema.safeParse(config);
if (!validated.success) {
  console.error('Invalid environment variables:', validated.error);
  process.exit(1);
}
