import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { app } from '../src/app.js';

describe('E2E: health', () => {
  describe('GET /health', () => {
    it('returns ok', async () => {
      const res = await request(app).get('/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toEqual('ok');
    });
  });

  describe('GET /live', () => {
    it('returns ok', async () => {
      const res = await request(app).get('/live');
      expect(res.status).toBe(200);
      expect(res.body.status).toEqual('ok');
    });
  });

  describe('GET /readz', () => {
    it('returns ok', async () => {
      const res = await request(app).get('/ready');
      expect(res.status).toBe(200);
      expect(res.body.status).toEqual('ok');
    });
  });
});
