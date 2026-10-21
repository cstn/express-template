import pino from 'pino';

import { config } from '../config/app.js';

const isProd = config.ENV === 'production';

export const logger = pino({
  level: process.env.LOG_LEVEL ?? (isProd ? 'info' : 'debug'),
  redact: [
    'req.headers.authorization',
    'req.headers.cookie',
    '*.password',
    '*.token',
  ],
  transport: isProd
    ? undefined
    : {
        target: 'pino-pretty',
        options: {
          ignore: 'pid,hostname,req.headers,res.headers',
        },
      },
});
