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

export const placeholderPages = [
  { slug: 'how-it-works', title: 'How BarkLens works', eyebrow: 'How it works' },
  { slug: 'plans', title: 'More good years start now.', eyebrow: 'Plans' },
  { slug: 'conditions', title: 'The conditions owners ask about most.', eyebrow: 'In plain English' },
  { slug: 'conditions/arthritis', title: 'Arthritis in dogs', eyebrow: 'In plain English' },
  { slug: 'conditions/cushings-disease', title: 'Cushing’s disease in dogs', eyebrow: 'In plain English' },
  { slug: 'conditions/diabetes', title: 'Diabetes in dogs', eyebrow: 'In plain English' },
  { slug: 'conditions/heart-disease', title: 'Heart disease in dogs', eyebrow: 'In plain English' },
  { slug: 'conditions/kidney-disease', title: 'Kidney values in dogs', eyebrow: 'In plain English' },
  { slug: 'conditions/liver-disease', title: 'Liver enzymes in dogs', eyebrow: 'In plain English' },
  { slug: 'conditions/pancreatitis', title: 'Pancreatitis in dogs', eyebrow: 'In plain English' },
  { slug: 'conditions/thyroid', title: 'Thyroid values in dogs', eyebrow: 'In plain English' },
  { slug: 'care-team', title: 'Everyone who helps, on the same page.', eyebrow: 'Care team' },
  { slug: 'charlie-story', title: 'For Charlie', eyebrow: 'Our story' },
  { slug: 'where-the-answers-come-from', title: 'Where the answers come from.', eyebrow: 'Sources' },
  { slug: 'your-records-are-yours', title: 'Your records are yours.', eyebrow: 'Your records' },
  { slug: 'blog', title: 'Coming soon.', eyebrow: 'Blog' },
  { slug: 'privacy', title: 'Your records are not our business model.', eyebrow: 'Privacy' },
  { slug: 'terms', title: 'The short version, then the fine print.', eyebrow: 'Terms of use' },
  { slug: 'waitlist', title: 'First year at half price.', eyebrow: 'Founding member offer' }
] as const;
