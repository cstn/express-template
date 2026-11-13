import { z } from '../../../openapi/registry.ts';

export const UserResponseSchema = z
  .object({
    id: z.string(),
    externalId: z.string(),
    username: z.string(),
    email: z.string(),
    firstName: z.string().nullable(),
    lastName: z.string().nullable(),
  })
  .meta({
    id: 'UserResponse',
    description: 'User response schema',
  });

export type UserResponse = z.infer<typeof UserResponseSchema>;
