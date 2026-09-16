import { createServer } from 'node:http';
import { FakeMailgunClient, MailgunClient, MailgunError } from './mailgun-client.mjs';
import { ValidationError, WaitlistService } from './waitlist-service.mjs';

const port = Number(process.env.PORT || 4310);
const mode = process.env.MAILGUN_MODE || 'real';
const client = mode === 'fake' ? new FakeMailgunClient() : new MailgunClient();
const waitlist = new WaitlistService(client);
const rateLimits = new Map();

function allowedOrigin(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    const host = url.hostname;
    if (
      host === '127.0.0.1' ||
      host === 'localhost' ||
      host === 'barklens.com' ||
      host.endsWith('.barklens.com') ||
      host === 'perplexity.ai' ||
      host.endsWith('.perplexity.ai') ||
      host === 'pplx.app' ||
      host.endsWith('.pplx.app')
    ) return url.origin;
  } catch {}
  return null;
}

function allowedSiteBase(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (!allowedOrigin(url.origin)) return null;
    url.search = '';
    url.hash = '';
    if (!url.pathname.endsWith('/')) url.pathname += '/';
    return url.href.replace(/\/$/, '');
  } catch {
    return null;
  }
}

function setCors(request, response) {
  const origin = allowedOrigin(request.headers.origin);
  if (origin) {
    response.setHeader('Access-Control-Allow-Origin', origin);
    response.setHeader('Vary', 'Origin');
  }
  response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function sendJson(response, status, data) {
  response.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff'
  });
  response.end(JSON.stringify(data));
}

async function readJson(request) {
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

function enforceRateLimit(request) {
  const forwarded = request.headers['x-forwarded-for'];
  const ip = String(Array.isArray(forwarded) ? forwarded[0] : forwarded || request.socket.remoteAddress);
  const now = Date.now();
  const current = rateLimits.get(ip) || [];
  const recent = current.filter((time) => now - time < 15 * 60 * 1000);
  if (recent.length >= 8) {
    const error = new Error('Too many attempts. Please try again in a few minutes.');
    error.status = 429;
    throw error;
  }
  recent.push(now);
  rateLimits.set(ip, recent);
}

function requestOrigin(request) {
  const explicit = allowedOrigin(request.headers.origin);
  if (explicit) return explicit;
  const host = request.headers['x-forwarded-host'] || request.headers.host;
  const protocol = request.headers['x-forwarded-proto'] || 'http';
  return `${protocol}://${host}`;
}

const server = createServer(async (request, response) => {
  setCors(request, response);
  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  const url = new URL(request.url, 'http://server.local');
  try {
    if (request.method === 'GET' && url.pathname === '/api/health') {
      const deep = url.searchParams.get('deep') === '1';
      const lists = deep ? await client.getLists() : null;
      sendJson(response, 200, {
        ok: true,
        mode,
        mailgunConfigured: client.configured,
        listAddress: client.listAddress,
        ...(deep ? {
          mailgunReachable: true,
          existingLists: (lists.items || []).map((list) => list.address)
        } : {})
      });
      return;
    }

    if (request.method === 'POST' && url.pathname === '/api/waitlist') {
      enforceRateLimit(request);
      const input = await readJson(request);
      if (input.company) {
        sendJson(response, 200, { ok: true });
        return;
      }
      const publicBase =
        allowedSiteBase(process.env.WAITLIST_PUBLIC_ORIGIN) ||
        allowedSiteBase(input.siteOrigin) ||
        requestOrigin(request);
      const result = await waitlist.signup({
        ...input,
        signupIp: String(request.headers['x-forwarded-for'] || request.socket.remoteAddress || '').split(',')[0].trim()
      }, publicBase);
      sendJson(response, 200, result);
      return;
    }

    if (request.method === 'POST' && url.pathname === '/api/unsubscribe') {
      enforceRateLimit(request);
      const input = await readJson(request);
      const result = await waitlist.unsubscribe(input.token || url.searchParams.get('token'));
      sendJson(response, 200, result);
      return;
    }

    sendJson(response, 404, { ok: false, error: 'Not found.' });
  } catch (error) {
    const status =
      error instanceof ValidationError ? 400 :
      error instanceof MailgunError ? (error.status >= 400 && error.status < 500 ? 502 : 503) :
      error.status || 500;
    console.error(JSON.stringify({
      level: 'error',
      path: url.pathname,
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
});

server.listen(port, '0.0.0.0', () => {
  console.log(`BarkLens waitlist server listening on port ${port} (${mode} mode)`);
});

export { server };
