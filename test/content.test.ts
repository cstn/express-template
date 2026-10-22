import request from 'supertest';
import { beforeEach, describe, expect, it } from 'vitest';

import { app } from '../src/app.js';
import { ContentsResponse } from '../src/modules/content/dto/get-content.response.js';
import {
  Content,
  ContentModel,
} from '../src/modules/content/models/content-model.js';

const createContent = async (overrides?: Partial<Content>) =>
  ContentModel.create({
    _id: '6a4e5a4eac598a2804dd4f30',
    title: 'test',
    description: 'test',
    ...overrides,
  });

describe('E2E: content', () => {
  describe('GET /content', () => {
    it('returns content list', async () => {
      await createContent();

      const res = await request(app).get('/v1/content');

      expect(res.status).toBe(200);
      expect((res.body as ContentsResponse).total).toEqual(1);
      expect((res.body as ContentsResponse).items).toHaveLength(1);
    });
  });

  describe('GET /content/:id', () => {
    beforeEach(createContent);

    it('returns content', async () => {
      const res = await request(app).get(
        '/v1/content/6a4e5a4eac598a2804dd4f30'
      );
      expect(res.status).toBe(200);
    });

    it('returns 400 if id is invalid', async () => {
      const res = await request(app).get('/v1/content/123');
      expect(res.status).toBe(400);
    });

    it('returns 404 if content not found', async () => {
      const res = await request(app).get(
        '/v1/content/6a4e5a4eac598a2804dd4f31'
      );
      expect(res.status).toBe(404);
    });
  });
});
