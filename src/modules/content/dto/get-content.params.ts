import { z } from '../../../openapi/registry.ts';

export const GetContentParamsSchema = z
  .object({
    id: z.string().describe('Content id').openapi({
      example: '6a4e5a4eac598a2804dd4f30',
    }),
  })
  .meta({
    id: 'GetContentParams',
    description: 'Get content params',
  });

export type GetContentParams = z.infer<typeof GetContentParamsSchema>;
