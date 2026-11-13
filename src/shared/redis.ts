import { Redis } from 'ioredis';

import { config } from '../config/app.ts';
import { logger } from '../utils/logger.ts';

export const redis: Redis = new Redis(config.REDIS_URL, {
  maxRetriesPerRequest: 3,
});

redis.on('error', (err: Error) => logger.error(err, 'Redis error:'));
redis.on('connect', () => logger.info('Redis connected'));
