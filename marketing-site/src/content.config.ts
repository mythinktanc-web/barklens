import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const categories = [
  'Labs and Reports',
  'Medications and Labels',
  'Food and Nutrition',
  'Conditions',
  'Veterinary Visit Preparation'
] as const;

const sourceSchema = z.object({
  label: z.string().min(2),
  url: z.string().regex(/^https:\/\/[^\s]+$/, 'Source URL must use https://'),
  note: z.string().min(8)
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string().min(8).max(100),
    seoTitle: z.string().min(8).max(90).optional(),
    description: z.string().min(40).max(180),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().min(2),
    authorDisclosure: z.string().optional(),
    category: z.enum(categories),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().startsWith('/images/'),
    coverMobileImage: z.string().startsWith('/images/').optional(),
    coverPosition: z.string().optional(),
    coverAlt: z.string().min(8).max(180),
    emergencyPointer: z.string().min(40).max(600).optional(),
    emergencySource: z.string().url().optional(),
    draft: z.boolean().default(true),
    sourcesVerified: z.boolean().default(false),
    releaseApproved: z.boolean().optional(),
    readNext: z.array(z.string()).max(3).default([]),
    fromParameter: z.string().optional(),
    faq: z.array(z.object({
      question: z.string().min(5),
      answer: z.string().min(10)
    })).default([]),
    veterinaryReviewer: z.string().optional(),
    sources: z.array(sourceSchema).min(1)
  }).superRefine((article, context) => {
    if (!article.draft && !article.sourcesVerified) {
      context.addIssue({
        code: 'custom',
        path: ['sourcesVerified'],
        message: 'Published articles must have checked source links.'
      });
    }
  })
});

const legal = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/legal' }),
  schema: z.object({
    title: z.string().min(5),
    description: z.string().min(40).max(180),
    effectiveDate: z.coerce.date(),
    documentType: z.enum(['terms', 'privacy'])
  })
});

export const collections = { blog, legal };
