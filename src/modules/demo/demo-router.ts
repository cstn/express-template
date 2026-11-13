import { Request, Response, Router } from 'express';

import { requireAuth } from '../../middleware/auth.ts';

export const router = Router();

router.get('/', requireAuth, (req: Request, res: Response) => {
  res.json({ locale: req.locale });
});
