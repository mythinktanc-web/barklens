# BarkLens Phase 9 Launch Checklist

## Completed in code

- Responsive multi-page Astro build
- Preview-safe nested-page routing
- Canonical URLs and sitemap
- Prelaunch noindex meta tags and blocking robots file
- Vercel project configuration and security headers
- Vercel-compatible waitlist, unsubscribe, and health endpoints
- Mailgun US-region API authentication support
- Analytics integration prepared but disabled pending legal approval
- Waitlist validation, duplicate handling, referral tracking, welcome email, and unsubscribe flow
- Custom 404 page
- Automated build, internal-link, metadata, and prohibited-copy audit
- Desktop and mobile accessibility checks

## Waiting for legal

- Final Terms of Use
- Final Privacy Policy
- Subscription, email, cookie, analytics, retention, and jurisdiction decisions
- Removal of draft notices

## Waiting for production approval

- Create or select the Vercel project
- Set production environment variables
- Run a Mailgun test signup using an approved test address
- Connect `barklens.com` and confirm DNS
- Confirm `www` redirect
- Enable analytics only after the approved privacy/cookie decision
- Set `PUBLIC_SITE_NOINDEX=false`
- Verify the live sitemap and submit it to search engines
- Run the final live-domain desktop/mobile acceptance test
