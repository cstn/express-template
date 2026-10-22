import '../modules/auth/auth-doc.js';
import '../modules/users/users-doc.js';

import { OpenApiGeneratorV31 } from '@asteasolutions/zod-to-openapi';
import yaml from 'yaml';

import { registry } from './registry.js';

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
    ],
  });

export const buildOpenApiYaml = () => yaml.stringify(buildOpenApiDocument());
