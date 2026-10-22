import { z } from 'zod';

export const GetContentParamsSchema = z.object({
  id: z.string(),
});

export type GetContentParams = z.infer<typeof GetContentParamsSchema>;
