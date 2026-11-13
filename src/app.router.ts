import './config/app.ts';

import { Router } from 'express';

import { router as authRouter } from './modules/auth/auth-router.ts';
import { router as contentRouter } from './modules/content/content-router.ts';
import { router as demoRouter } from './modules/demo/demo-router.ts';
import { router as usersRouter } from './modules/users/users-router.ts';

export const router = Router();

router.use('/auth', authRouter);
router.use('/demo', demoRouter);
router.use('/users', usersRouter);
router.use('/content', contentRouter);
