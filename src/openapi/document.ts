import '../modules/auth/auth-doc.ts';
import '../modules/users/users-doc.ts';
import '../modules/content/content-doc.ts';

import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import yaml from 'yaml';

import { registry } from './registry.ts';

export const buildOpenApiDocument = () =>
  new OpenApiGeneratorV31(registry.definitions).generateDocument({
    openapi: '3.1.0',
    info: {
      title: 'Express API',
      description: 'Express API template',
      contact: {
        name: 'Carsten Stein',
        email: 'carsten.stein@cast-it.de',
      },
      version: process.env.npm_package_version ?? '1.0.0',
    },
    servers: [{ url: '/v1' }],
    security: [{ bearerAuth: [] }],
    tags: [
      {
        name: 'Auth',
        description: 'Authentication and authorization',
      },
      {
        name: 'Users',
        description: 'User accounts',
      },
      {
        name: 'Content',
        description: 'Content',
      },
    ],
  });

export const buildOpenApiYaml = () => yaml.stringify(buildOpenApiDocument());
