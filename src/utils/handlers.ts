import { Request, RequestHandler, Response } from 'express';
import { z, ZodType } from 'zod';

type ObjectSchema = z.ZodObject<z.ZodRawShape>;
export type RawParams<S extends z.ZodObject<z.ZodRawShape>> = {
  [K in keyof z.infer<S> & string]: string;
};

type Schemas = {
  params?: ObjectSchema;
  query?: ZodType;
  body?: ZodType;
};

type Parsed<T extends Schemas> = {
  params: T['params'] extends ObjectSchema ? z.infer<T['params']> : undefined;
  query: T['query'] extends ZodType ? z.infer<T['query']> : undefined;
  body: T['body'] extends ZodType ? z.infer<T['body']> : undefined;
};

export const withRequest =
  <T extends Schemas>(schemas: T) =>
  (
    handler: (req: Request, res: Response, data: Parsed<T>) => unknown
  ): RequestHandler =>
  async (req, res, next) => {
    const errors: Record<string, unknown> = {};
    const data: Record<string, unknown> = {};

    for (const key of ['params', 'query', 'body'] as const) {
      const schema = schemas[key];
      if (!schema) {
        continue;
      }
      const parsed = schema.safeParse(req[key]);
      if (parsed.success) {
        data[key] = parsed.data;
      } else {
        errors[key] = z.treeifyError(parsed.error);
      }
    }

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ errors });
      return;
    }

    try {
      await handler(req, res, data as Parsed<T>);
    } catch (err) {
      next(err);
    }
  };
