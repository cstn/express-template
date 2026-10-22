import { z } from 'zod';

import { PagingQuerySchema } from '../../../shared/dto/get-page.query.js';

export const GetContentsQuerySchema = PagingQuerySchema;

export type GetContentsQuery = z.infer<typeof GetContentsQuerySchema>;
