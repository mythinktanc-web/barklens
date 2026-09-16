const subject = 'Thank you — from Ben';

const body = `You're in.

If you signed up for this, I already know something about you. Your dog isn't a pet. They're family. And you've been paying attention for years — how they move in the morning, what they'll eat and won't, the small thing you noticed last spring that nobody else would have caught.

You've been carrying all of that yourself. Not because anyone asked you to, but because no one else was going to.

That's what BarkLens is for. Every record in one place. Every lab value sitting next to the ones before it. Every answer traced to veterinary sources a licensed veterinarian approved. Not to replace what you know about your dog — to finally give it somewhere to live.

BarkLens was built in honor of my boy Charlie. We had sixteen and a half years together, and paying close attention to his health was part of how I loved him. I built it because it's the tool I wish I'd had for him — especially toward the end.

What happens next

You're a founding member, which puts you in the first wave of invites — sent as soon as testing is complete, before any public signup. I'll email you the day yours is ready.

Thank you for being one of the first.

Ben Singer
Charlie's Dad
Founder, BarkLens`;

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export function welcomeEmail(unsubscribeUrl) {
  const safeUnsubscribeUrl = escapeHtml(unsubscribeUrl);
  const paragraphs = body.split('\n\n');
  const htmlBody = paragraphs
    .map((paragraph) => {
      if (paragraph === 'What happens next') {
        return `<h2 style="font-family:Georgia,serif;font-size:22px;line-height:1.25;margin:32px 0 12px;color:#10271f;">What happens next</h2>`;
      }
      return `<p style="font-family:Arial,sans-serif;font-size:16px;line-height:1.65;margin:0 0 18px;color:#28332f;">${escapeHtml(paragraph).replaceAll('\n', '<br>')}</p>`;
    })
    .join('');

  return {
    subject,
    text: `${body}\n\nUnsubscribe from BarkLens email: ${unsubscribeUrl}`,
    html: `<!doctype html>
<html lang="en">
  <body style="margin:0;padding:0;background:#f4f0e8;">
    <div style="display:none;max-height:0;overflow:hidden;">You're in the first wave of BarkLens invites.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f0e8;">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:620px;background:#ffffff;border-radius:20px;">
            <tr>
              <td style="padding:42px 42px 34px;">
                <p style="font-family:Arial,sans-serif;font-size:12px;font-weight:700;letter-spacing:3px;margin:0 0 26px;color:#177158;">BARKLENS</p>
                ${htmlBody}
                <p style="font-family:Arial,sans-serif;font-size:12px;line-height:1.5;margin:30px 0 0;color:#68736f;">
                  You joined the BarkLens founding-member waitlist.
                  <a href="${safeUnsubscribeUrl}" style="color:#177158;">Unsubscribe</a>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`
  };
}
