import assert from 'node:assert/strict';
import test from 'node:test';
import healthHandler from '../api/health.mjs';
import unsubscribeHandler from '../api/unsubscribe.mjs';
import waitlistHandler from '../api/waitlist.mjs';

function responseFixture() {
  return {
    headers: {},
    statusCode: 200,
    body: null,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(value) {
      this.statusCode = value;
      return this;
    },
    json(value) {
      this.body = value;
      return this;
    }
  };
}

test('production waitlist endpoint rejects unsupported methods', async () => {
  const response = responseFixture();
  await waitlistHandler({ method: 'GET', headers: {} }, response);
  assert.equal(response.statusCode, 405);
  assert.equal(response.body.ok, false);
  assert.equal(response.headers.Allow, 'POST');
});

test('production waitlist endpoint silently accepts the spam honeypot', async () => {
  const response = responseFixture();
  await waitlistHandler({
    method: 'POST',
    headers: {},
    body: { company: 'automated submission' }
  }, response);
  assert.equal(response.statusCode, 200);
  assert.deepEqual(response.body, { ok: true });
});

test('production unsubscribe endpoint rejects invalid tokens before Mailgun is called', async () => {
  const response = responseFixture();
  await unsubscribeHandler({
    method: 'POST',
    headers: {},
    body: { token: 'invalid' }
  }, response);
  assert.equal(response.statusCode, 400);
  assert.equal(response.body.ok, false);
});

test('production health endpoint returns configuration status without secrets', async () => {
  const response = responseFixture();
  healthHandler({ method: 'GET', headers: {} }, response);
  assert.equal(response.statusCode, 200);
  assert.equal(response.body.ok, true);
  assert.equal(Object.hasOwn(response.body, 'mailgunConfigured'), true);
  assert.equal(JSON.stringify(response.body).includes('MAILGUN_API_KEY'), false);
});
