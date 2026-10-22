import { NextFunction, Request, RequestHandler, Response } from 'express';
import { z, ZodType } from 'zod';

export const withQuery =
  <S extends ZodType>(schema: S) =>
  (
    handler: (req: Request, res: Response, query: z.infer<S>) => unknown
  ): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.parse(req.query);

    try {
      Promise.resolve(handler(req, res, parsed)).catch(next);
    } catch (e) {
      next(e);
    }
  };

export const withParams =
  <S extends ZodType>(schema: S) =>
  (
    handler: (req: Request, res: Response, params: z.infer<S>) => unknown
  ): RequestHandler =>
  (req: Request, res: Response, next: NextFunction) => {
    const parsed = schema.parse(req.params);

    try {
      Promise.resolve(handler(req, res, parsed)).catch(next);
    } catch (e) {
      next(e);
    }
  };
