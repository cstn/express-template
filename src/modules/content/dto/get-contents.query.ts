import { z } from 'zod';

import { PagingQuerySchema } from '../../../shared/dto/get-page.query.ts';

export const GetContentsQuerySchema = PagingQuerySchema;

export type GetContentsQuery = z.infer<typeof GetContentsQuerySchema>;
