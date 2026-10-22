import type { RequestHandler } from 'express';
import { ZodType } from 'zod';

type Schemas = { params?: ZodType; query?: ZodType; body?: ZodType };

export const validate =
  (schemas: Schemas): RequestHandler =>
  (req, _res, next) => {
    try {
      if (schemas.params) {
        // @ts-expect-error request params
        req.params = schemas.params.parse(req.params);
      }
      if (schemas.query) {
        Object.defineProperty(req, 'query', {
          value: schemas.query.parse(req.query),
          writable: true,
        });
      }
      if (schemas.body) {
        req.body = schemas.body.parse(req.body);
      }
      next();
    } catch (e) {
      next(e);
    }
  };
