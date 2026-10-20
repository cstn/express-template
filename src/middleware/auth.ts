import type { NextFunction, Request, RequestHandler, Response } from 'express';
import { createRemoteJWKSet, errors, type JWTPayload, jwtVerify } from 'jose';

export type Role = 'user' | 'admin';

export interface AuthUser {
  id: string;
  role?: Role;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

interface AccessTokenPayload extends JWTPayload {
  role?: Role;
}

const JWKS = createRemoteJWKSet(new URL(process.env.JWKS_URL!));

export const requireAuth: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];
  if (!token) {
    res.status(401).json({ error: 'unauthorized' });
    return;
  }

  try {
    const { payload } = await jwtVerify<AccessTokenPayload>(token, JWKS, {
      algorithms: ['RS256'],
      issuer: process.env.JWT_ISSUER!,
      audience: process.env.JWT_AUDIENCE!,
    });

    if (!payload.sub) {
      res.status(401).json({ error: 'unauthorized' });
      return;
    }

    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch (err) {
    if (err instanceof errors.JWTExpired) {
      res.status(401).json({ error: 'token_expired' });
      return;
    }
    res.status(401).json({ error: 'unauthorized' });
  }
};
