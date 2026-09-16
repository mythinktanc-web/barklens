import { MailgunClient, MailgunError } from '../server/mailgun-client.mjs';
import { ValidationError, WaitlistService } from '../server/waitlist-service.mjs';

const rateLimits = new Map();

export function waitlistService() {
  return new WaitlistService(new MailgunClient());
}

export async function readBody(request) {
  if (request.body && typeof request.body === 'object') return request.body;
  if (typeof request.body === 'string') {
    try {
      return JSON.parse(request.body || '{}');
    } catch {
      throw new ValidationError('Request body must be valid JSON.');
    }
  }

  let body = '';
  for await (const chunk of request) {
    body += chunk;
    if (body.length > 20_000) throw new ValidationError('Request is too large.');
  }
  try {
    return JSON.parse(body || '{}');
  } catch {
    throw new ValidationError('Request body must be valid JSON.');
  }
}

export function publicOrigin(request, input = {}) {
  const candidates = [
    process.env.WAITLIST_PUBLIC_ORIGIN,
    input.siteOrigin,
    `${request.headers['x-forwarded-proto'] || 'https'}://${request.headers['x-forwarded-host'] || request.headers.host || 'barklens.com'}`
  ];
  for (const value of candidates) {
    try {
      const url = new URL(value);
      const host = url.hostname.toLowerCase();
      if (
        url.protocol === 'https:' &&
        (
          host === 'barklens.com' ||
          host.endsWith('.barklens.com') ||
          host.endsWith('.vercel.app') ||
          host.endsWith('.pplx.app')
        )
      ) return url.origin;
    } catch {}
  }
  return 'https://barklens.com';
}

export function enforceRateLimit(request) {
  const forwarded = request.headers['x-forwarded-for'];
  const ip = String(Array.isArray(forwarded) ? forwarded[0] : forwarded || request.socket?.remoteAddress || 'unknown')
    .split(',')[0]
    .trim();
  const now = Date.now();
  const recent = (rateLimits.get(ip) || []).filter((time) => now - time < 15 * 60 * 1000);
  if (recent.length >= 8) {
    const error = new Error('Too many attempts. Please try again in a few minutes.');
    error.status = 429;
    throw error;
  }
  recent.push(now);
  rateLimits.set(ip, recent);
}

export function sendJson(response, status, data) {
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.status(status).json(data);
}

export function sendError(response, error) {
  const status =
    error instanceof ValidationError ? 400 :
    error instanceof MailgunError ? (error.status >= 400 && error.status < 500 ? 502 : 503) :
    error.status || 500;
  console.error(JSON.stringify({
    level: 'error',
    status,
    name: error.name,
    message: error.message
  }));
  sendJson(response, status, {
    ok: false,
    error: status >= 500
      ? 'We couldn’t hold your spot right now. Please try again.'
      : error.message
  });
}

export function requirePost(request, response) {
  if (request.method === 'POST') return true;
  response.setHeader('Allow', 'POST');
  sendJson(response, 405, { ok: false, error: 'Method not allowed.' });
  return false;
}
