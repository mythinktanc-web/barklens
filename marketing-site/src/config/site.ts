export const site = {
  name: 'BarkLens',
  legalName: 'Think Tanc LLC',
  canonicalOrigin: 'https://barklens.com',
  contactEmail: 'hello@barklens.com',
  description:
    "BarkLens organizes your dog's health records and answers questions from that history and published veterinary sources."
} as const;

export const routes = {
  home: '/',
  howItWorks: '/how-it-works/',
  plans: '/plans/',
  conditions: '/conditions/',
  arthritis: '/conditions/arthritis/',
  cushings: '/conditions/cushings-disease/',
  diabetes: '/conditions/diabetes/',
  heart: '/conditions/heart-disease/',
  kidney: '/conditions/kidney-disease/',
  liver: '/conditions/liver-disease/',
  pancreatitis: '/conditions/pancreatitis/',
  thyroid: '/conditions/thyroid/',
  careTeam: '/care-team/',
  charlieStory: '/charlie-story/',
  sources: '/where-the-answers-come-from/',
  records: '/your-records-are-yours/',
  blog: '/blog/',
  privacy: '/privacy/',
  terms: '/terms/',
  waitlist: '/waitlist/'
} as const;

export const primaryNavigation = [
  { label: 'How it works', href: routes.howItWorks },
  { label: 'Why BarkLens', href: '/#why-barklens' },
  { label: 'Plans', href: routes.plans },
  { label: 'Our Story', href: routes.charlieStory },
  { label: 'Blog', href: routes.blog }
] as const;
