import cors from 'cors';
import type { Request, Response } from 'express';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import { router as appRouter } from './app.router.js';
import { config } from './config/app.js';
import { errorHandler } from './middleware/error-handler.js';
import { router as healthRouter } from './modules/health/health-router.js';
import { buildSpec } from './openapi/document.js';

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
