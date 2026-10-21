import { NextFunction, Request, Response } from 'express';

const SUPPORTED_LOCALES = ['en', 'de', 'fr', 'es'] as const;
const DEFAULT_LOCALE = 'en';

function parseAcceptLanguage(header: string | undefined): string[] {
  if (!header) return [];

  return header
    .split(',')
    .map((part) => {
      const [tag, ...params] = part.trim().split(';');
      const qParam = params.find((p) => p.trim().startsWith('q='));
      // @ts-expect-error Param defined
      const q = qParam ? parseFloat(qParam.split('=')[1]) : 1;
      // @ts-expect-error tag defined
      return { tag: tag.trim(), q: Number.isNaN(q) ? 0 : q };
    })
    .filter((l) => l.tag && l.tag !== '*' && l.q > 0)
    .sort((a, b) => b.q - a.q)
    .map((l) => l.tag);
}

export function localeMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const override =
    (req.headers['x-locale'] as string | undefined) ??
    (req.query.lang as string | undefined);

  const candidates = override
    ? [override]
    : parseAcceptLanguage(req.headers['accept-language']);

  let locale: string = DEFAULT_LOCALE;

  for (const tag of candidates) {
    // "de-DE" -> "de"
    const base = tag.toLowerCase().split('-')[0] ?? '';
    if ((SUPPORTED_LOCALES as readonly string[]).includes(base)) {
      locale = base;
      break;
    }
  }

  req.locale = locale;
  next();
}
