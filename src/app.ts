import type { Request, Response } from 'express';
import express from 'express';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';

import { router as appRouter } from './app.router.js';
import { config } from './config/app.js';
import { errorHandler } from './middleware/error-handler.js';
import { router as healthRouter } from './modules/health/health-router.js';
import { buildSpec } from './openapi/document.js';

const app = express();
const PORT = config.PORT;

app.disable('x-powered-by');
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.ENABLE_DOCS === 'true') {
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

const server = app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
