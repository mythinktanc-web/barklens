import assert from 'node:assert/strict';
import test from 'node:test';
import { MailgunClient } from './mailgun-client.mjs';

test('existing member lookup unwraps Mailgun member responses', async () => {
  const fetchImpl = async () => new Response(JSON.stringify({
    member: {
      address: 'ben@example.com',
      name: 'Ben',
      subscribed: true,
      vars: {
        referral_code: 'original-code',
        welcome_sent_at: '2026-09-16T18:00:00.000Z'
      }
    }
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  const client = new MailgunClient({
    baseUrl: 'https://api.mailgun.test',
    proxyToken: 'not-a-real-secret',
    fetchImpl
  });
  const member = await client.getMember('ben@example.com');
  assert.equal(member.address, 'ben@example.com');
  assert.equal(member.subscribed, true);
  assert.equal(member.vars.referral_code, 'original-code');
});
