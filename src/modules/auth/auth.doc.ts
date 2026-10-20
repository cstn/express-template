import { ErrorSchema, registry } from '../../openapi/registry.js';
import { UserResponseSchema } from './dto/get-user.response.js';

registry.register('UserResponse', UserResponseSchema);
registry.registerPath({
  method: 'get',
  path: '/auth/me',
  operationId: 'getMe',
  tags: ['Auth'],
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
  },
});
