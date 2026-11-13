import { Request, Response, Router } from 'express';

import { withRequest } from '../../utils/handlers.ts';
import { toContentResponseDto } from './content-mapper.ts';
import { findAll, findById } from './content-service.ts';
import {
  GetContentParams,
  GetContentParamsSchema,
} from './dto/get-content.params.ts';
import {
  GetContentsQuery,
  GetContentsQuerySchema,
} from './dto/get-contents.query.ts';

export const router = Router();

const getAll = async (
  _req: Request,
  res: Response,
  { query }: { query: GetContentsQuery }
) => {
  const contents = await findAll(query.offset, query.limit);
  res.json({
    total: contents.length,
    items: contents.map(toContentResponseDto),
  });
};
router.get('/', withRequest({ query: GetContentsQuerySchema })(getAll));

const getById = async (
  _req: Request,
  res: Response,
  { params }: { params: GetContentParams }
) => {
  const content = await findById(params.id);
  if (!content) {
    return res.status(404).json({ message: 'Content not found' });
  }

  return res.json(toContentResponseDto(content));
};
router.get('/:id', withRequest({ params: GetContentParamsSchema })(getById));
