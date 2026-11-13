import { Request } from 'express';
import rateLimit, { ipKeyGenerator, Store } from 'express-rate-limit';
import { type RedisReply, RedisStore } from 'rate-limit-redis';

import { redis } from '../shared/redis.ts';

const makeStore = (prefix: string): Store | undefined => {
  if (process.env.NODE_ENV === 'test') {
    return undefined;
  }

  return new RedisStore({
    sendCommand: (command: string, ...args: string[]) =>
      redis.call(command, ...args) as Promise<RedisReply>,
    prefix,
  });
};

export const apiLimiter = rateLimit({
  windowMs: 60_000,
  limit: 100,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  keyGenerator: (req: Request) =>
    `${ipKeyGenerator(req.ip ?? '')}:${req.user?.id ?? 'anon'}`,
  store: makeStore('rl:api:standard:'),
});
