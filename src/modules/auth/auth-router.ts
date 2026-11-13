import { Request, Response, Router } from 'express';

import { requireAuth } from '../../middleware/auth.ts';

export const router = Router();

router.get('/me', requireAuth, (req: Request, res: Response) => {
  res.json(req.user);
});
