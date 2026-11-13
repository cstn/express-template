import { ErrorSchema, registry } from '../../openapi/registry.ts';
import { AuthenticatedUserResponseSchema } from './dto/get-user.response.ts';

registry.register('AuthenticatedUserResponse', AuthenticatedUserResponseSchema);
registry.registerPath({
  description: 'Current user',
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
      content: {
        'application/json': { schema: AuthenticatedUserResponseSchema },
      },
    },
    401: {
      description: 'Unauthorized',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
});
