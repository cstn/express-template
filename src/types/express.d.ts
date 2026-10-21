declare global {
  namespace Express {
    interface Request {
      locale: string;
      user?: {
        id: string;
        role?: string;
      };
    }
  }
}

export {};
