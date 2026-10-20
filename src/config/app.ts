import { config as dotenv } from 'dotenv';
import { z } from 'zod';

dotenv({
  quiet: true,
});

export const EnvironmentSchema = z.object({
  PORT: z.number(),
  DOCS: z.boolean(),
  ALLOWED_ORIGINS: z.array(z.string()).optional(),
  JWKS_URL: z.url(),
  JWT_ISSUER: z.string(),
  JWT_AUDIENCE: z.string(),
});

export type Environment = z.infer<typeof EnvironmentSchema>;

export const config: Environment = {
  PORT: Number(process.env.PORT) || 3000,
  DOCS: process.env.ENABLE_DOCS === 'true',
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS?.split(','),
  JWKS_URL: process.env.JWKS_URL as string,
  JWT_ISSUER: process.env.JWT_ISSUER as string,
  JWT_AUDIENCE: process.env.JWT_AUDIENCE as string,
};

const validated = EnvironmentSchema.safeParse(config);
if (!validated.success) {
  console.error('Invalid environment variables:', validated.error);
  process.exit(1);
}
