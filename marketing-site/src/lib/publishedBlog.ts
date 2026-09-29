import type { CollectionEntry } from 'astro:content';

export function isPublishedBlog({ data }: CollectionEntry<'blog'>): boolean {
  return !data.draft && data.sourcesVerified &&
    data.releaseApproved !== false &&
    data.publishDate.valueOf() <= Date.now();
}
