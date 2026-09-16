import {
  enforceRateLimit,
  publicOrigin,
  readBody,
  requirePost,
  sendError,
  sendJson,
  waitlistService
} from './_shared.mjs';

export default async function handler(request, response) {
  if (!requirePost(request, response)) return;
  try {
    enforceRateLimit(request);
    const input = await readBody(request);
    if (input.company) {
      sendJson(response, 200, { ok: true });
      return;
    }
    const result = await waitlistService().signup(input, publicOrigin(request, input));
    sendJson(response, 200, result);
  } catch (error) {
    sendError(response, error);
  }
}
