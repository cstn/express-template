import { ContentModel } from './models/content-model.js';

export const getAll = (
  skip: number | undefined = 0,
  limit: number | undefined = 10
) => ContentModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
