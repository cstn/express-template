import { z } from '../../../openapi/registry.ts';

export const AuthenticatedUserResponseSchema = z
  .object({
    id: z.string(),
  })
  .meta({
    id: 'AuthenticatedUserResponse',
    description: 'User response schema',
  });

export type AuthenticatedUserResponse = z.infer<
  typeof AuthenticatedUserResponseSchema
>;
