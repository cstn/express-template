import { type ErrorRequestHandler, Request, Response } from 'express';
import { ZodError } from 'zod';

export const errorHandler: ErrorRequestHandler = (
  err: any,
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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (err?.driverError?.code === '23505') {
    return res.status(409).json({ error: 'Already exists' });
  }

  req.log.error({ err }, 'unhandled error');
  return (
    res
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      .status((err.status as number) ?? 500)
      .json({ error: { message: (err as Error).message ?? 'Internal error' } })
  );
};
