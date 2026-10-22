import { ErrorSchema, registry } from '../../openapi/registry.js';
import { GetContentParamsSchema } from './dto/get-content.params.js';
import {
  ContentResponseSchema,
  ContentsResponseSchema,
} from './dto/get-content.response.js';
import { GetContentsQuerySchema } from './dto/get-contents.query.js';

registry.register('ContentResponse', ContentResponseSchema);
registry.registerPath({
  description: 'Content list',
  method: 'get',
  path: '/content',
  operationId: 'getContents',
  request: {
    query: GetContentsQuerySchema,
  },
  tags: ['Content'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Content list',
      content: { 'application/json': { schema: ContentsResponseSchema } },
    },
    400: {
      description: 'Invalid request',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    404: {
      description: 'Content not found',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
});
registry.registerPath({
  description: 'Content',
  method: 'get',
  path: '/content/{id}',
  request: {
    params: GetContentParamsSchema,
  },
  operationId: 'getContent',
  tags: ['Content'],
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: 'Content',
      content: { 'application/json': { schema: ContentResponseSchema } },
    },
    404: {
      description: 'Content not found',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
});
