import './config/app.js';

import { Router } from 'express';

import { router as authRouter } from './modules/auth/auth-router.js';
import { router as contentRouter } from './modules/content/content-router.js';
import { router as demoRouter } from './modules/demo/demo-router.js';
import { router as usersRouter } from './modules/users/users-router.js';

export const router = Router();

router.use('/auth', authRouter);
router.use('/demo', demoRouter);
router.use('/users', usersRouter);
router.use('/content', contentRouter);
