import { randomBytes } from 'node:crypto';
import { MailgunError } from './mailgun-client.mjs';
import { welcomeEmail } from './email-template.mjs';

const allowedAges = new Set(['Puppy', 'Young Adult', 'Adult', 'Senior']);
const allowedMulti = new Set(['Yes', 'No']);

export class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
    this.status = 400;
  }
}

function cleanText(value, label, maxLength) {
  const text = String(value || '').trim().replace(/\s+/g, ' ');
  if (!text) throw new ValidationError(`${label} is required.`);
  if (text.length > maxLength) throw new ValidationError(`${label} is too long.`);
  return text;
}

export function validateSignup(input) {
  const email = String(input.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) {
    throw new ValidationError('Enter a valid email address.');
  }
  const age = cleanText(input.age, 'Dog’s age', 24);
  const multipleDogs = cleanText(input.multi, 'Multiple dogs', 3);
  if (!allowedAges.has(age)) throw new ValidationError('Choose a valid age range.');
  if (!allowedMulti.has(multipleDogs)) throw new ValidationError('Choose Yes or No.');
  return {
    email,
    firstName: cleanText(input.firstName, 'First name', 80),
    dogName: cleanText(input.dogName, 'Dog’s name', 80),
    breed: cleanText(input.breed, 'Dog’s breed', 120),
    age,
    multipleDogs,
    referredBy: String(input.referredBy || '').trim().slice(0, 32),
    consentVersion: String(input.consentVersion || '').trim().slice(0, 80),
    signupSource: String(input.signupSource || '').trim().slice(0, 160),
    signupIp: String(input.signupIp || '').trim().slice(0, 80)
  };
}

function makeToken(bytes = 18) {
  return randomBytes(bytes).toString('base64url');
}

function buildUrls(origin, vars) {
  const base = origin.replace(/\/$/, '');
  return {
    referralUrl: `${base}/waitlist/?refer=${encodeURIComponent(vars.referral_code)}`,
    unsubscribeUrl: `${base}/unsubscribe/?token=${encodeURIComponent(vars.unsubscribe_token)}`
  };
}

export class WaitlistService {
  constructor(client) {
    this.client = client;
  }

  async signup(input, origin) {
    const signup = validateSignup(input);
    let member = await this.client.getMember(signup.email);
    let created = false;
    let reactivated = false;

    if (!member) {
      const vars = {
        first_name: signup.firstName,
        dog_name: signup.dogName,
        breed: signup.breed,
        dog_age: signup.age,
        multiple_dogs: signup.multipleDogs,
        referral_code: makeToken(8),
        referred_by: signup.referredBy || null,
        joined_at: new Date().toISOString(),
        consent_version: signup.consentVersion || 'waitlist-v1-2026-09-16',
        signup_source: signup.signupSource || '/waitlist/',
        signup_ip: signup.signupIp || null,
        unsubscribe_token: makeToken(24),
        welcome_sent_at: null
      };
      try {
        member = await this.client.addMember({
          address: signup.email,
          name: signup.firstName,
          vars,
          subscribed: true
        });
        member.vars = vars;
        created = true;
      } catch (error) {
        if (!(error instanceof MailgunError) || error.status !== 400) throw error;
        member = await this.client.getMember(signup.email);
        if (!member) throw error;
      }
    }

    const vars = member.vars || {};
    if (!member.subscribed) {
      member = await this.client.updateMember(signup.email, {
        subscribed: true,
        vars: { ...vars, resubscribed_at: new Date().toISOString() }
      });
      reactivated = true;
    }

    const urls = buildUrls(origin, member.vars);
    let emailSent = Boolean(member.vars.welcome_sent_at);
    if (!emailSent) {
      await this.client.sendWelcome({
        to: signup.email,
        email: welcomeEmail(urls.unsubscribeUrl)
      });
      const sentAt = new Date().toISOString();
      member = await this.client.updateMember(signup.email, {
        vars: { ...member.vars, welcome_sent_at: sentAt }
      });
      emailSent = true;
    }

    return {
      ok: true,
      created,
      duplicate: !created,
      reactivated,
      emailSent,
      firstName: member.vars.first_name || signup.firstName,
      dogName: member.vars.dog_name || signup.dogName,
      referralUrl: buildUrls(origin, member.vars).referralUrl
    };
  }

  async unsubscribe(token) {
    if (!/^[A-Za-z0-9_-]{24,64}$/.test(String(token || ''))) {
      throw new ValidationError('This unsubscribe link is invalid.');
    }
    const member = await this.client.findMemberByToken(token);
    if (!member) throw new ValidationError('This unsubscribe link is invalid or expired.');
    if (!member.subscribed) {
      return { ok: true, alreadyUnsubscribed: true };
    }
    await this.client.updateMember(member.address, {
      subscribed: false,
      vars: { ...member.vars, unsubscribed_at: new Date().toISOString() }
    });
    return { ok: true, alreadyUnsubscribed: false };
  }
}
