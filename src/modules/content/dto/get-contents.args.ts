import { z } from 'zod';

export const GetContentsArgsSchema = z.object({
  offset: z.coerce.number().int().min(0).optional().default(0),
  limit: z.coerce.number().int().min(1).max(100).optional().default(10),
});

export type GetContentsArgs = z.infer<typeof GetContentsArgsSchema>;
