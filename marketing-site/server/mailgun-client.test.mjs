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

test('production API keys use Mailgun basic authentication without exposing the key', async () => {
  let authorization = '';
  const fetchImpl = async (_url, options) => {
    authorization = options.headers.Authorization;
    return new Response(JSON.stringify({ items: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  };
  const client = new MailgunClient({
    baseUrl: 'https://api.mailgun.test',
    apiKey: 'test-key',
    fetchImpl
  });
  await client.getLists();
  assert.equal(authorization, `Basic ${Buffer.from('api:test-key').toString('base64')}`);
  assert.equal(client.configured, true);
});

test('welcome email includes one-click unsubscribe headers', async () => {
  let submittedForm;
  const fetchImpl = async (_url, options) => {
    submittedForm = options.body;
    return new Response(JSON.stringify({ id: 'queued' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  };
  const client = new MailgunClient({
    baseUrl: 'https://api.mailgun.test',
    apiKey: 'test-key',
    fetchImpl
  });
  await client.sendWelcome({
    to: 'ben@example.com',
    email: {
      subject: 'Thank you — from Ben',
      text: 'Welcome',
      html: '<p>Welcome</p>',
      oneClickUnsubscribeUrl: 'https://barklens.com/api/unsubscribe?token=test-token'
    }
  });
  assert.equal(
    submittedForm.get('h:List-Unsubscribe'),
    '<https://barklens.com/api/unsubscribe?token=test-token>'
  );
  assert.equal(submittedForm.get('h:List-Unsubscribe-Post'), 'List-Unsubscribe=One-Click');
});
