import { randomUUID } from 'node:crypto';

import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { pinoHttp } from 'pino-http';
import swaggerUi from 'swagger-ui-express';

import { router as appRouter } from './app.router.js';
import { config } from './config/app.js';
import { errorHandler } from './middleware/error-handler.js';
import { router as healthRouter } from './modules/health/health-router.js';
import { buildSpec } from './openapi/document.js';
import { logger } from './utils/logger.js';

export const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(cors({ origin: config.ALLOWED_ORIGINS }));
app.use(
  express.json({
    limit: '1mb',
  })
);
app.use(rateLimit({ windowMs: 15 * 60_000, limit: 100 }));
app.use(express.urlencoded({ extended: false }));
app.use(
  pinoHttp({
    logger,
    quietReqLogger: true,
    genReqId: (req: Request, res: Response) => {
      const id = req.headers['x-request-id'] ?? randomUUID();
      res.setHeader('x-request-id', id);
      return id;
    },
    autoLogging: {
      ignore: (req: Request) => req.url === '/health',
    },
  })
);

if (config.DOCS) {
  const spec = buildSpec();
  app.get('/openapi.json', (_req: Request, res: Response) => res.json(spec));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec));
}

app.get('/', (_req: Request, res: Response) => {
  res.send('Express API template');
});
app.use(healthRouter);
app.use('/v1', appRouter);
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});
app.use(errorHandler);
