import { Redis } from 'ioredis';

import { config } from '../config/app.js';
import { logger } from '../utils/logger.js';

export let redis: Redis | undefined;

export const connectRedis = () => {
  if (!redis) {
    redis = new Redis(config.REDIS_URL, {
      maxRetriesPerRequest: 3,
    });

    redis.on('error', (err: Error) => logger.error(err, 'Redis error:'));
    redis.on('connect', () => logger.info('Redis connected'));
  }
};

export const getRedisClient = (): Redis => {
  if (!redis) {
    connectRedis();
  }

  return redis!;
};
