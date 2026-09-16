# Phase 4 Waitlist QA

**Completed:** September 16, 2026  
**Scope:** Mailgun signup storage, welcome email, duplicates, referrals, and
unsubscribe handling

## Gate result

Phase 4 passed. The BarkLens waitlist now has a tested backend, a real Mailgun
list, connected desktop form, welcome-email delivery, stable referral
identities, duplicate suppression, and unsubscribe handling.

## Mailgun result

- Region: US
- Sending domain: `barklens.com`
- List: `waitlist@barklens.com`
- List access: readonly
- Real test member: `mythinktanc@gmail.com`
- Welcome subject: `Thank you — from Ben`
- Welcome status: delivered
- Member subscribed: yes
- Referral code stored: yes
- Unsubscribe token stored: yes

Mailgun's mailing-list API stores arbitrary member variables and supports
updating subscribed status without deleting the member:
https://documentation.mailgun.com/docs/mailgun/user-manual/sending-messages/mailing-lists

Mailgun accepted and delivered the welcome through:
https://documentation.mailgun.com/docs/mailgun/api-reference/send/mailgun/messages

## Automated checks

- Five backend tests passed.
- New signup creates one member and one welcome email.
- Repeated signup returns the same referral identity and does not send again.
- Referral source is stored with the member.
- Unsubscribe preserves the record and changes subscribed status.
- Invalid input is rejected before Mailgun is called.
- Wrapped existing-member responses from Mailgun are regression-tested.
- Astro check: 0 errors, 0 warnings, 0 hints.
- Dependency audit: 0 known vulnerabilities.
- Prohibited live labels removed: AI-powered, tracker, monitoring, Smart Lens.
- Active project references to WordPress removed.

## Browser checks

- Required fields block incomplete submissions.
- Referred signup reaches the success state.
- First name and dog name appear in the confirmation.
- Form is fully removed after success.
- Server-generated referral URL appears in the Share panel.
- QR code renders from the referral URL.
- Share panel remains centered and keyboard-dismissible.
- Deployed duplicate flow reaches success with zero browser errors.
- Unsubscribe success and invalid-link states were tested against the fake
  adapter.

## QA incident and correction

During deployed duplicate testing, Mailgun's existing-member response wrapper
was initially parsed incorrectly. Three copies of the approved welcome email
were delivered to Ben's test address, and the test member's stored variables
were overwritten. No other recipient was affected.

The parser was corrected, a dedicated regression test was added, and the test
member was repaired with a fresh referral code and unsubscribe token. The
member remained subscribed and no email was sent during repair.

## Hosting boundary

The attached private preview uses a credential-backed sandbox server. Phase 4
proves the complete integration, but durable staging and production hosting
remain in Phase 9 and Phase 11. Share links use the intended canonical
`https://barklens.com/waitlist/` destination.
