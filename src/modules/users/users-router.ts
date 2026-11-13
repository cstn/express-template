import { Request, Response, Router } from 'express';

import { requireAuth } from '../../middleware/auth.ts';
import { apiLimiter } from '../../middleware/limiters.ts';
import { toUserResponse } from './users-mapper.ts';
import { getUserByExternalId } from './users-service.ts';

export const router = Router();

router.get(
  '/',
  requireAuth,
  apiLimiter,
  async (req: Request, res: Response) => {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ error: 'Auth required' });
    }

    const user = await getUserByExternalId(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    return res.json(toUserResponse(user));
  }
);
