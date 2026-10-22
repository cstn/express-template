import { ContentModel } from './models/content-model.js';

export const getAll = (skip = 0, limit = 10) =>
  ContentModel.find().sort({ createdAt: -1 }).skip(skip).limit(limit).lean();
