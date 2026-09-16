import { MailgunClient } from '../server/mailgun-client.mjs';
import { sendJson } from './_shared.mjs';

export default function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    sendJson(response, 405, { ok: false, error: 'Method not allowed.' });
    return;
  }
  const client = new MailgunClient();
  sendJson(response, 200, {
    ok: true,
    mailgunConfigured: client.configured
  });
}
