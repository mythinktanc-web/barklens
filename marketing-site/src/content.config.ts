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
    seoTitle: z.string().min(8).max(60).optional(),
    description: z.string().min(40).max(180),
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().min(2),
    category: z.enum(categories),
    tags: z.array(z.string()).default([]),
    coverImage: z.string().startsWith('/images/'),
    coverAlt: z.string().min(8).max(180),
    draft: z.boolean().default(true),
    sourcesVerified: z.boolean().default(false),
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

export const collections = { blog };
