import {
  enforceRateLimit,
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
    const result = await waitlistService().unsubscribe(input.token || request.query?.token);
    sendJson(response, 200, result);
  } catch (error) {
    sendError(response, error);
  }
}
