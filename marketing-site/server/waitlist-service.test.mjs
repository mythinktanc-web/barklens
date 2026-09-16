import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import { FakeMailgunClient } from './mailgun-client.mjs';
import { ValidationError, WaitlistService } from './waitlist-service.mjs';

async function fixture() {
  const directory = await mkdtemp(join(tmpdir(), 'barklens-waitlist-'));
  const file = join(directory, 'mailgun.json');
  const client = new FakeMailgunClient({ file });
  return {
    client,
    service: new WaitlistService(client),
    file,
    async cleanup() {
      await rm(directory, { recursive: true, force: true });
    }
  };
}

const signup = {
  email: 'Ben@Example.com',
  firstName: 'Ben',
  dogName: 'Charlie',
  breed: 'Dachshund',
  age: 'Senior',
  multi: 'No',
  referredBy: 'friend123'
};

test('new signup is stored and receives one welcome email', async () => {
  const testFixture = await fixture();
  try {
    const result = await testFixture.service.signup(signup, 'https://barklens.com');
    const stored = JSON.parse(await readFile(testFixture.file, 'utf8'));
    assert.equal(result.created, true);
    assert.equal(result.duplicate, false);
    assert.match(result.referralUrl, /^https:\/\/barklens\.com\/waitlist\/\?refer=/);
    assert.equal(stored.sent.length, 1);
    assert.equal(stored.members['ben@example.com'].vars.referred_by, 'friend123');
    assert.ok(stored.members['ben@example.com'].vars.welcome_sent_at);
  } finally {
    await testFixture.cleanup();
  }
});

test('duplicate signup returns the same referral link without another email', async () => {
  const testFixture = await fixture();
  try {
    const first = await testFixture.service.signup(signup, 'https://barklens.com');
    const duplicate = await testFixture.service.signup(signup, 'https://barklens.com');
    const stored = JSON.parse(await readFile(testFixture.file, 'utf8'));
    assert.equal(duplicate.created, false);
    assert.equal(duplicate.duplicate, true);
    assert.equal(duplicate.referralUrl, first.referralUrl);
    assert.equal(stored.sent.length, 1);
  } finally {
    await testFixture.cleanup();
  }
});

test('unsubscribe keeps the member record and changes subscribed status', async () => {
  const testFixture = await fixture();
  try {
    await testFixture.service.signup(signup, 'https://barklens.com');
    const before = await testFixture.client.getMember('ben@example.com');
    const result = await testFixture.service.unsubscribe(before.vars.unsubscribe_token);
    const after = await testFixture.client.getMember('ben@example.com');
    assert.equal(result.ok, true);
    assert.equal(after.subscribed, false);
    assert.ok(after.vars.unsubscribed_at);
  } finally {
    await testFixture.cleanup();
  }
});

test('invalid input is rejected before Mailgun is called', async () => {
  const testFixture = await fixture();
  try {
    await assert.rejects(
      testFixture.service.signup({ ...signup, email: 'not-an-email' }, 'https://barklens.com'),
      ValidationError
    );
  } finally {
    await testFixture.cleanup();
  }
});
