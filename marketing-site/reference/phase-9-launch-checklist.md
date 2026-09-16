# BarkLens Phase 9 Launch Checklist

## Completed in code

- Responsive multi-page Astro build
- Preview-safe nested-page routing
- Canonical URLs and sitemap
- Prelaunch noindex meta tags and blocking robots file
- Vercel project configuration and security headers
- Vercel-compatible waitlist, unsubscribe, and health endpoints
- Mailgun US-region API authentication support
- Analytics integration prepared and disabled until consent controls and the production GA configuration are verified
- Waitlist validation, duplicate handling, referral tracking, welcome email, and unsubscribe flow
- Approved Terms of Use and Privacy Policy installed
- Subscription, email, cookie, analytics, retention, vendor, and Care Team terms incorporated
- Legal identity, mailing address, effective date, and public contact reconciled
- Custom 404 page
- Automated build, internal-link, metadata, and prohibited-copy audit
- Desktop and mobile accessibility checks

## Waiting for production approval

- Create or select the Vercel project
- Set production environment variables
- Run a Mailgun test signup using an approved test address
- Connect `barklens.com` and confirm DNS
- Confirm `www` redirect
- Configure consent controls before enabling analytics for visitors where prior consent is required
- Verify the production Google Analytics configuration before setting `PUBLIC_ANALYTICS_ENABLED=true`
- Set `PUBLIC_SITE_NOINDEX=false`
- Verify the live sitemap and submit it to search engines
- Run the final live-domain desktop/mobile acceptance test
