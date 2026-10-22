import { ContentResponse } from './dto/get-content.response.js';
import { Content } from './models/content-model.js';

export const toContentResponseDto = (content: Content): ContentResponse => ({
  id: content._id.toString(),
  title: content.title,
  description: content.description,
  createdAt: content.createdAt.toISOString(),
  updatedAt: content.updatedAt?.toISOString(),
});
