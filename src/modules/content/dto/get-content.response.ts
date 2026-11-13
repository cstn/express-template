import { z } from '../../../openapi/registry.ts';

export const ContentResponseSchema = z
  .object({
    id: z.string(),
    title: z.string(),
    description: z.string().nullable().optional(),
    data: z.record(z.string(), z.unknown()).optional(),
    createdAt: z.iso.datetime({ offset: true }),
    updatedAt: z.iso.datetime({ offset: true }).optional(),
  })
  .meta({
    id: 'ContentResponse',
    description: 'Content response schema',
  });

export type ContentResponse = z.infer<typeof ContentResponseSchema>;

export const ContentsResponseSchema = z
  .object({
    total: z.number(),
    items: z.array(ContentResponseSchema),
  })
  .meta({
    id: 'ContentsResponse',
    description: 'Content list response schema',
  });

export type ContentsResponse = z.infer<typeof ContentsResponseSchema>;
