import { type ErrorRequestHandler, Request, Response } from 'express';
import mongoose from 'mongoose';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (
  err: Error & {
    code?: number;
    keyValue?: string;
    status?: number;
    driverError?: {
      code?: string;
    };
  },
  req: Request,
  res: Response
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        message: 'Validation failed',
        details: err.issues.map((i) => ({
          path: i.path.join('.'),
          message: i.message,
        })),
      },
    });
  }

  if (err instanceof mongoose.Error.ValidationError) {
    return res.status(400).json({ message: err.message });
  }
  if (err instanceof mongoose.Error.CastError) {
    return res.status(400).json({ message: 'Invalid id' });
  }

  if (err?.code === 11000) {
    return res
      .status(409)

      .json({ message: 'Duplicate key', keys: err.keyValue });
  }

  if (err?.driverError?.code === '23505') {
    return res.status(409).json({ error: 'Already exists' });
  }

  req.log.error({ err }, 'unhandled error');
  return res

    .status(err.status ?? 500)
    .json({ error: { message: err.message ?? 'Internal error' } });
};
