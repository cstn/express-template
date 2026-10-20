import {
  extendZodWithOpenApi,
  OpenAPIRegistry,
} from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';

extendZodWithOpenApi(z);
export { z };
export const registry = new OpenAPIRegistry();

export const bearerAuth = registry.registerComponent(
  'securitySchemes',
  'bearerAuth',
  {
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
  }
);

export const ErrorSchema = registry.register(
  'Error',
  z.object({
    error: z.object({
      message: z.string(),
      details: z
        .array(z.object({ path: z.string(), message: z.string() }))
        .optional(),
    }),
  })
);
