import { z } from '../../../openapi/registry.js';

export const UserResponseSchema = z
  .object({
    id: z.string(),
  })
  .meta({
    id: 'UserResponse',
    description: 'User response schema',
  });

export type UserResponse = z.infer<typeof UserResponseSchema>;
