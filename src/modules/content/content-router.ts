import { Request, Response, Router } from 'express';

import { validate } from '../../middleware/validate.js';
import { toContentResponseDto } from './content-mapper.js';
import { getAll } from './content-service.js';
import { GetContentsArgsSchema } from './dto/get-contents.args.js';

export const router = Router();

router.get(
  '/',
  validate({ query: GetContentsArgsSchema }),
  async (_req: Request, res: Response) => {
    const contents = await getAll();
    res.json({
      total: contents.length,
      items: contents.map(toContentResponseDto),
    });
  }
);
