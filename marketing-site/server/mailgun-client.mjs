import { readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';
import { mkdir } from 'node:fs/promises';

const credentialUrlName = 'CUSTOM_CRED_API_MAILGUN_NET_URL';
const credentialTokenName = 'CUSTOM_CRED_API_MAILGUN_NET_PROXY_AUTH_KEY';

export class MailgunError extends Error {
  constructor(message, status = 500, details = null) {
    super(message);
    this.name = 'MailgunError';
    this.status = status;
    this.details = details;
  }
}

function normalizeVars(vars) {
  if (!vars) return {};
  if (typeof vars === 'string') {
    try {
      return JSON.parse(vars);
    } catch {
      return {};
    }
  }
  return vars;
}

export class MailgunClient {
  constructor({
    listAddress = process.env.MAILGUN_LIST_ADDRESS || 'waitlist@barklens.com',
    domain = process.env.MAILGUN_DOMAIN || 'barklens.com',
    baseUrl = process.env[credentialUrlName] || process.env.MAILGUN_API_BASE || 'https://api.mailgun.net',
    proxyToken = process.env[credentialTokenName] || '',
    apiKey = process.env.MAILGUN_API_KEY || '',
    fetchImpl = fetch
  } = {}) {
    this.listAddress = listAddress;
    this.domain = domain;
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.proxyToken = proxyToken;
    this.apiKey = apiKey;
    this.fetch = fetchImpl;
  }

  get configured() {
    return Boolean(this.proxyToken || this.apiKey);
  }

  async request(path, { method = 'GET', form } = {}) {
    const headers = {};
    if (this.proxyToken) headers['x-api-key'] = this.proxyToken;
    if (!this.proxyToken && this.apiKey) {
      headers.Authorization = `Basic ${Buffer.from(`api:${this.apiKey}`).toString('base64')}`;
    }
    const response = await this.fetch(`${this.baseUrl}${path}`, {
      method,
      headers,
      body: form
    });
    let data = {};
    try {
      data = await response.json();
    } catch {
      data = {};
    }
    if (!response.ok) {
      throw new MailgunError(
        data.message || `Mailgun request failed with status ${response.status}`,
        response.status,
        data
      );
    }
    return data;
  }

  async getLists() {
    return this.request('/v3/lists/pages');
  }

  async createList() {
    const form = new FormData();
    form.set('address', this.listAddress);
    form.set('name', 'BarkLens Founding Members');
    form.set('description', 'BarkLens founding-member waitlist');
    form.set('access_level', 'readonly');
    form.set('reply_preference', 'list');
    return this.request('/v3/lists', { method: 'POST', form });
  }

  async getMember(address) {
    try {
      const result = await this.request(
        `/v3/lists/${encodeURIComponent(this.listAddress)}/members/${encodeURIComponent(address)}`
      );
      const member = result.member || result;
      return { ...member, vars: normalizeVars(member.vars) };
    } catch (error) {
      if (error instanceof MailgunError && error.status === 404) return null;
      throw error;
    }
  }

  async addMember({ address, name, vars, subscribed = true }) {
    const form = new FormData();
    form.set('address', address);
    form.set('name', name);
    form.set('vars', JSON.stringify(vars));
    form.set('subscribed', String(subscribed));
    form.set('upsert', 'false');
    const result = await this.request(
      `/v3/lists/${encodeURIComponent(this.listAddress)}/members`,
      { method: 'POST', form }
    );
    const member = result.member || result;
    return { ...member, vars: normalizeVars(member.vars || vars) };
  }

  async updateMember(address, { name, vars, subscribed }) {
    const form = new FormData();
    if (name !== undefined) form.set('name', name);
    if (vars !== undefined) form.set('vars', JSON.stringify(vars));
    if (subscribed !== undefined) form.set('subscribed', String(subscribed));
    const result = await this.request(
      `/v3/lists/${encodeURIComponent(this.listAddress)}/members/${encodeURIComponent(address)}`,
      { method: 'PUT', form }
    );
    const member = result.member || result;
    return { ...member, vars: normalizeVars(member.vars || vars) };
  }

  async listMembers({ limit = 100, skip = 0 } = {}) {
    const query = new URLSearchParams({ limit: String(limit), skip: String(skip) });
    const result = await this.request(
      `/v3/lists/${encodeURIComponent(this.listAddress)}/members?${query}`
    );
    return {
      ...result,
      items: (result.items || []).map((member) => ({
        ...member,
        vars: normalizeVars(member.vars)
      }))
    };
  }

  async findMemberByToken(token) {
    for (let skip = 0; ; skip += 100) {
      const page = await this.listMembers({ limit: 100, skip });
      const match = page.items.find((member) => member.vars?.unsubscribe_token === token);
      if (match) return match;
      if (page.items.length < 100) return null;
    }
  }

  async sendWelcome({ to, email }) {
    const form = new FormData();
    form.set('from', 'Ben at BarkLens <hello@barklens.com>');
    form.set('h:Reply-To', 'hello@barklens.com');
    form.set('to', to);
    form.set('subject', email.subject);
    form.set('text', email.text);
    form.set('html', email.html);
    form.set('o:tag', 'waitlist-welcome');
    return this.request(`/v3/${encodeURIComponent(this.domain)}/messages`, {
      method: 'POST',
      form
    });
  }
}

export class FakeMailgunClient {
  constructor({ file = process.env.FAKE_MAILGUN_STORE || '/tmp/barklens-fake-mailgun.json' } = {}) {
    this.file = file;
    this.listAddress = 'waitlist@barklens.com';
    this.configured = true;
  }

  async load() {
    try {
      return JSON.parse(await readFile(this.file, 'utf8'));
    } catch {
      return { listCreated: true, members: {}, sent: [] };
    }
  }

  async save(data) {
    await mkdir(dirname(this.file), { recursive: true });
    await writeFile(this.file, JSON.stringify(data, null, 2));
  }

  async getLists() {
    const data = await this.load();
    return { items: data.listCreated ? [{ address: this.listAddress }] : [] };
  }

  async createList() {
    const data = await this.load();
    data.listCreated = true;
    await this.save(data);
    return { message: 'Mailing list has been created' };
  }

  async getMember(address) {
    const data = await this.load();
    return data.members[address] || null;
  }

  async addMember({ address, name, vars, subscribed = true }) {
    const data = await this.load();
    if (data.members[address]) throw new MailgunError('Address already exists', 400);
    data.members[address] = { address, name, vars, subscribed };
    await this.save(data);
    return data.members[address];
  }

  async updateMember(address, updates) {
    const data = await this.load();
    if (!data.members[address]) throw new MailgunError('Address not found', 404);
    data.members[address] = { ...data.members[address], ...updates };
    await this.save(data);
    return data.members[address];
  }

  async findMemberByToken(token) {
    const data = await this.load();
    return Object.values(data.members).find(
      (member) => member.vars?.unsubscribe_token === token
    ) || null;
  }

  async sendWelcome({ to, email }) {
    const data = await this.load();
    data.sent.push({ to, subject: email.subject, text: email.text, html: email.html });
    await this.save(data);
    return { id: `fake-${data.sent.length}`, message: 'Queued. Thank you.' };
  }
}
