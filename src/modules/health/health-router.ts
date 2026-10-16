import { Router } from 'express';

import { healthy, liveness, readiness } from './health-service.js';
export const router = Router();

router.get('/live', (_req, res) => {
  res.send(liveness());
});

router.get('/ready', (_req, res) => {
  res.send(readiness());
});

router.get('/health', (_req, res) => {
  res.send(healthy());
});
