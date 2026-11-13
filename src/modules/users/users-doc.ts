import { ErrorSchema, registry } from '../../openapi/registry.ts';
import { UserResponseSchema } from './dto/get-user.response.ts';

registry.register('UserResponse', UserResponseSchema);
registry.registerPath({
  description: 'Current user account',
  method: 'get',
  path: '/users',
  operationId: 'getCurrentUser',
  tags: ['Users'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Current user',
      content: { 'application/json': { schema: UserResponseSchema } },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    404: {
      description: 'User account not found',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
});
