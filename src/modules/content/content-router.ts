import { Request, Response, Router } from 'express';

import { withQuery } from '../../utils/handlers.js';
import { toContentResponseDto } from './content-mapper.js';
import { getAll } from './content-service.js';
import {
  GetContentsArgs,
  GetContentsArgsSchema,
} from './dto/get-contents.args.js';

export const router = Router();

interface GetContentsQuery {
  offset?: string;
  limit?: string;
}

router.get(
  '/',
  withQuery(GetContentsArgsSchema)(
    async (
      _req: Request<object, object, object, GetContentsQuery>,
      res: Response,
      query: GetContentsArgs
    ) => {
      const contents = await getAll(query.offset, query.limit);
      res.json({
        total: contents.length,
        items: contents.map(toContentResponseDto),
      });
    }
  )
);
