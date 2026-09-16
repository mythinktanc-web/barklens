import { routes } from '@config/site';

export const howItWorksSteps = [
  {
    number: '01',
    image: '/images/home/step-add-record.webp',
    alt: 'An owner photographing a veterinary record',
    title: 'Add the records you already have.',
    body: 'Anything new? Upload it or snap a picture of it.'
  },
  {
    number: '02',
    image: '/images/home/step-ask.webp',
    alt: 'A dog beside a food bowl and a phone showing its chart',
    title: 'They can’t talk. But the records can.',
    body: 'The chart carries it now. Ask anything. The answer starts from their personal health story.'
  },
  {
    number: '03',
    image: '/images/home/step-peace-of-mind.webp',
    alt: 'An owner resting beside their dog',
    title: 'Peace of Mind.',
    body: 'Peace of mind comes from having all of their history in one place, ready for any question you have.'
  }
] as const;

export const captureItems = [
  {
    number: '01',
    label: 'Lab report',
    blurb: 'Every value lands with the reference range printed beside it.',
    image: '/images/home/capture-lab-report.webp',
    alt: 'A printed veterinary laboratory report',
    eyebrow: 'The lab report',
    caption: 'Every value, with its range',
    rows: ['ALP 156 U/L · range 20–150', 'BUN 32 mg/dL · range 7–27']
  },
  {
    number: '02',
    label: 'Medication label',
    blurb: 'Drug, dose, and warnings go in the timeline. Related records sit beside it.',
    image: '/images/home/capture-medication.webp',
    alt: 'A Rimadyl prescription bottle labelled for Charlie',
    eyebrow: 'The medication label',
    caption: 'What the label states',
    rows: [
      'Rimadyl (carprofen), an NSAID. The label calls for laboratory testing before and during use.',
      'Charlie’s ALT came back mildly elevated on 3/14. Worth raising at Charlie’s next visit.'
    ]
  },
  {
    number: '03',
    label: 'Supplement label',
    blurb: 'Active ingredients and serving information go in the timeline beside medications and labs.',
    image: '/images/home/capture-supplement.webp',
    alt: 'The product facts label on a joint supplement bottle',
    eyebrow: 'The supplement label',
    caption: 'What the label states',
    rows: [
      'Glucosamine 500 mg, chondroitin 400 mg, MSM 300 mg, and omega-3 150 mg per two chews.',
      'Charlie is on Rimadyl for arthritis. Ask the veterinarian about using them together.'
    ]
  },
  {
    number: '04',
    label: 'Food label',
    blurb: 'Ingredients, fat, and phosphorus are recorded as printed and placed beside the chart.',
    image: '/images/home/capture-food.webp',
    alt: 'The back of a dry dog food bag',
    eyebrow: 'The food label',
    caption: 'The bag, as printed',
    rows: [
      'Top ingredients: chicken meal, brown rice, oatmeal, chicken fat, and pea protein.',
      'Charlie has pancreatitis in the chart. Put the food label beside the next veterinary question.'
    ]
  },
  {
    number: '05',
    label: 'Home-cooked meal',
    blurb: 'Ingredients and rough portions are recorded as the owner describes them.',
    image: '/images/home/capture-home-cooked.webp',
    alt: 'A bowl of home-cooked turkey, rice, carrots, and green beans',
    eyebrow: 'The home-cooked meal',
    caption: 'The bowl, as served',
    rows: [
      'Logged: turkey breast, white rice, carrots, and green beans.',
      'The ingredients and portions stay in Charlie’s history for the next veterinary conversation.'
    ]
  },
  {
    number: '06',
    label: 'Stool photo',
    blurb: 'Scored on the Purina 1–7 scale and kept beside diet, observations, and labs.',
    image: '/images/home/capture-stool.webp',
    alt: 'A stool photo taken on grass',
    eyebrow: 'The stool photo',
    caption: 'Scored on the Purina scale',
    rows: [
      'Scored using the Purina Fecal Scoring Chart, 1–7.',
      'Charlie’s lipase came back elevated on 3/14. Worth raising at Charlie’s next visit.'
    ]
  }
] as const;

export const whyItems = [
  {
    number: '01',
    title: 'The BarkLens Standard',
    body: 'Every source reviewed by a licensed veterinarian.',
    href: routes.sources
  },
  {
    number: '02',
    title: 'Easy to Share Records',
    body: 'New veterinarian, specialist, or ER. The history comes with you.',
    href: routes.records
  },
  {
    number: '03',
    title: 'Your Care Team',
    body: 'Add family or a sitter at no cost.',
    href: routes.careTeam
  }
] as const;

export const conditions = [
  {
    title: 'Kidney disease',
    clue: 'BUN and creatinine drifting across draws; more water in, more water out.',
    tag: 'Labs',
    href: routes.kidney
  },
  {
    title: 'Liver disease',
    clue: 'ALT or ALP changing while a long-term medication sits on the list.',
    tag: 'Labs · meds',
    href: routes.liver
  },
  {
    title: 'Pancreatitis',
    clue: 'Lipase, food labels, and the treats that were easy to forget.',
    tag: 'Food · labs',
    href: routes.pancreatitis
  },
  {
    title: 'Cushing’s disease',
    clue: 'Thirst, panting, and appetite logged over months, not days.',
    tag: 'Daily notes',
    href: routes.cushings
  },
  {
    title: 'Diabetes',
    clue: 'Glucose and fructosamine beside the owner’s daily log.',
    tag: 'Labs · food',
    href: routes.diabetes
  },
  {
    title: 'Thyroid',
    clue: 'T4 beside coat and weight changes the owner recorded.',
    tag: 'Labs · notes',
    href: routes.thyroid
  },
  {
    title: 'Heart disease',
    clue: 'Sleeping breaths counted and several medications kept straight.',
    tag: 'Notes · meds',
    href: routes.heart
  },
  {
    title: 'Arthritis',
    clue: 'Stiff mornings recorded beside NSAID laboratory work.',
    tag: 'Notes · meds',
    href: routes.arthritis
  }
] as const;

export const planFeatures = [
  ['Record import', 'Every veterinary record, one timeline'],
  ['Ask anything', 'Answers from your dog’s full history'],
  ['Trend history', 'Each draw shown beside the ones before it'],
  ['Snap a picture', 'Labs, medications, food, and stool filed as records'],
  ['Vet export', 'One organized history for an appointment'],
  ['Care team', 'Co-owner included, helper seats free']
] as const;

export const faqs = [
  {
    question: 'Do I have to dig up my dog’s records?',
    answer:
      'No. Add the records you already have by uploading a file or taking a photo. BarkLens organizes them into one history.'
  },
  {
    question: 'Is BarkLens a vet?',
    answer: 'No. BarkLens holds your dog’s chart and explains what is in it. Your vet makes the calls.'
  },
  {
    question: 'Does it diagnose?',
    answer:
      'No. BarkLens turns scattered records into one timeline, shows when values move in the same direction, and answers from published veterinary sources.'
  },
  {
    question: 'What if I have more than one dog?',
    answer: 'Family covers up to four dogs. Plus covers one. Each dog gets their own history.'
  },
  {
    question: 'How do I add records?',
    answer:
      'Upload a report or take a photo. BarkLens keeps the original and organizes the information into your dog’s history.'
  },
  {
    question: 'Is a vet involved?',
    answer:
      'Yes. Every source is reviewed by a licensed veterinarian. That review covers the source library, not each generated answer.'
  },
  {
    question: 'What can I take a picture of?',
    answer: 'A medication label, food bag, stool, or laboratory report. Each becomes a record in your dog’s timeline.'
  },
  {
    question: 'Can my partner see it too?',
    answer: 'Yes. A co-owner seat is included, and helper seats for a sitter, walker, or family member are free.'
  },
  {
    question: 'Can I try BarkLens for free?',
    answer: 'Yes. Seven days free. We email before the trial ends, and you can cancel before then.'
  }
] as const;
