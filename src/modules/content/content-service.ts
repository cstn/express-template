import { ContentModel } from './models/content-model.ts';

export const findAll = (
  skip: number | undefined = 0,
  limit: number | undefined = 10
) => ContentModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();

export const findById = (id: string) => ContentModel.findById(id).lean();
